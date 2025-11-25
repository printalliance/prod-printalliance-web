import { z } from "zod";

const phonePattern =
  /^(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$|^(?:\+?44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

export const contactSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phonePattern, "Enter a valid US or UK number"),
  country: z.enum(["USA", "UK"]).refine((val) => !!val, {
    message: "Select a country",
  }),
  printerBrand: z.string().optional(),
  issueDescription: z
    .string()
    .min(20, "Please describe your issue (minimum 20 characters)"),
  contactMethod: z.enum(["phone", "email", "chat"]),
  preferredTime: z.string().optional(),
  newsletter: z.boolean().optional(),
  gdpr: z.literal(true).refine((val) => val, {
    message: "Please agree to the privacy policy",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

