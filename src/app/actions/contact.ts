"use server";

import { z } from "zod";
import { Resend } from "resend";

const contactBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .regex(/^[a-zA-Z\s\-']+$/, "Invalid characters in name"),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone format"),
  service: z
    .enum(["laptop-repair", "mobile-repair", "cctv-installation", "other"], {
      message: "Please select a service",
    })
    .default("cctv-installation"),
  message: z.string().max(1000).optional().default(""),
  postcode: z.string().trim().max(15).optional().default(""),
  propertyType: z.string().trim().max(50).optional().default(""),
  cameraCount: z.string().trim().max(50).optional().default(""),
  source: z.string().trim().max(50).optional().default("contact-page"),
  b_website: z.string().optional().default(""), // honeypot
});

export type ContactFormState = {
  success: boolean;
  errors?: {
    name?: string[];
    phone?: string[];
    service?: string[];
    message?: string[];
    postcode?: string[];
    propertyType?: string[];
    cameraCount?: string[];
    _form?: string[];
  };
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot check: bots fill hidden fields
  const honeypot = formData.get("b_website")?.toString().trim();
  if (honeypot && honeypot.length > 0) {
    // Return success to silently drop bot spam without sending email
    return { success: true };
  }

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    service: formData.get("service") || "cctv-installation",
    message: formData.get("message") || "",
    postcode: formData.get("postcode") || "",
    propertyType: formData.get("propertyType") || "",
    cameraCount: formData.get("cameraCount") || "",
    source: formData.get("source") || "contact-page",
    b_website: formData.get("b_website") || "",
  };

  const result = contactBaseSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;
  const isCctvPage = data.source === "cctv-page";

  // Context-specific validation
  if (!isCctvPage) {
    // Standard contact page requires a message
    if (!data.message || data.message.trim().length === 0) {
      return {
        success: false,
        errors: {
          message: ["Please enter a message"],
        },
      };
    }
  } else {
    // CCTV quote page requires postcode & property type
    if (!data.postcode || data.postcode.trim().length < 2) {
      return {
        success: false,
        errors: {
          postcode: ["Please enter your postcode for the site survey."],
        },
      };
    }
    if (!data.propertyType || !["Home", "Business"].includes(data.propertyType)) {
      return {
        success: false,
        errors: {
          propertyType: ["Please select property type (Home or Business)."],
        },
      };
    }
  }

  const recaptchaResponse = formData.get("g-recaptcha-response");
  if (!recaptchaResponse) {
    return {
      success: false,
      errors: {
        _form: ["Please complete the reCAPTCHA verification."],
      },
    };
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;

  try {
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return {
        success: false,
        errors: {
          _form: ["reCAPTCHA verification failed. Please try again."],
        },
      };
    }
  } catch {
    return {
      success: false,
      errors: {
        _form: ["Unable to verify reCAPTCHA at this time. Please try again."],
      },
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailSubject = isCctvPage
      ? `New CCTV Quote Request from ${data.name} (${data.propertyType || "Property"})`
      : `New enquiry from ${data.name} - ${data.service}`;

    const rows = [
      `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 140px;">Lead Source:</td><td style="padding: 10px; border: 1px solid #ddd; font-family: monospace;">${data.source}</td></tr>`,
      `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td><td style="padding: 10px; border: 1px solid #ddd;">${data.name}</td></tr>`,
      `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td><td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>`,
    ];

    if (data.postcode) {
      rows.push(
        `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Postcode:</td><td style="padding: 10px; border: 1px solid #ddd;">${data.postcode}</td></tr>`
      );
    }
    if (data.propertyType) {
      rows.push(
        `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Property Type:</td><td style="padding: 10px; border: 1px solid #ddd;">${data.propertyType}</td></tr>`
      );
    }
    if (data.cameraCount) {
      rows.push(
        `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Cameras Needed:</td><td style="padding: 10px; border: 1px solid #ddd;">${data.cameraCount}</td></tr>`
      );
    }

    rows.push(
      `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Service:</td><td style="padding: 10px; border: 1px solid #ddd;">${data.service}</td></tr>`
    );

    if (data.message) {
      rows.push(
        `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message:</td><td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${data.message}</td></tr>`
      );
    } else {
      rows.push(
        `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message:</td><td style="padding: 10px; border: 1px solid #ddd; color: #888; font-style: italic;">No additional notes provided</td></tr>`
      );
    }

    await resend.emails.send({
      from: "Gadget Repair <noreply@gadgetrepair.uk>",
      to: ["info@gadgetrepair.uk"],
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000; border-bottom: 2px solid #FFD400; padding-bottom: 10px;">
            ${isCctvPage ? "New CCTV Installation Quote Request" : "New Website Enquiry"}
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            ${rows.join("")}
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            Sent from ${isCctvPage ? "CCTV Landing Page (/services/cctv-installation)" : "Contact Page (/contact)"} on Gadget Repair.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return {
      success: false,
      errors: {
        _form: [
          "Failed to send message. Please try calling or using WhatsApp instead.",
        ],
      },
    };
  }

  console.log("Form submission processed:", data);

  return { success: true };
}
