"use server";

import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).regex(/^[a-zA-Z\s\-']+$/, "Invalid characters in name"),
  phone: z.string().min(6, "Please enter a valid phone number").max(20).regex(/^[0-9+\s\-()]+$/, "Invalid phone format"),
  service: z.enum(["laptop-repair", "mobile-repair", "cctv-installation", "other"], {
    message: "Please select a service",
  }),
  message: z.string().min(1, "Please enter a message").max(1000),
});

export type ContactFormState = {
  success: boolean;
  errors?: {
    name?: string[];
    phone?: string[];
    service?: string[];
    message?: string[];
    _form?: string[];
  };
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    message: formData.get("message"),
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
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
  } catch (err) {
    return {
      success: false,
      errors: {
        _form: ["Unable to verify reCAPTCHA at this time. Please try again."],
      },
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Gadget Repair <noreply@gadgetrepair.uk>',
      to: ['info@gadgetrepair.uk'],
      subject: `New enquiry from ${result.data.name} - ${result.data.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000; border-bottom: 1px solid #ddd; padding-bottom: 10px;">New Website Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${result.data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${result.data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${result.data.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message:</td>
              <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${result.data.message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">This email was sent from the Gadget Repair website contact form.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to send message. Please try calling or using WhatsApp instead."],
      },
    };
  }

  console.log("Contact form submission:", result.data);

  return { success: true };
}
