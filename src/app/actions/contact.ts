"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  service: z.enum(["laptop-repair", "mobile-repair", "cctv-installation", "other"], {
    message: "Please select a service",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
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

  // TODO: Send email via Resend
  // Requires RESEND_API_KEY in .env
  // Example:
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'Website <noreply@yourdomain.com>',
  //   to: ['your-email@example.com'],
  //   subject: `New enquiry from ${result.data.name}`,
  //   text: `Name: ${result.data.name}\nPhone: ${result.data.phone}\nService: ${result.data.service}\nMessage: ${result.data.message}`,
  // });

  console.log("Contact form submission:", result.data);

  return { success: true };
}
