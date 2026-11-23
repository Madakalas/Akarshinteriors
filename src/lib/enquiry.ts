import { z } from "zod";

const indianPhone = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(indianPhone, "Please enter a valid 10-digit mobile number"),
  email: z.union([z.literal(""), z.email("Please enter a valid email")]).optional(),
  city: z.string().trim().min(1, "Please choose your city").max(80),
  service: z.string().trim().min(1, "Please choose a service").max(80),
  propertyType: z.string().max(60).optional(),
  area: z.string().max(40).optional(),
  budget: z.string().max(60).optional(),
  timeline: z.string().max(60).optional(),
  message: z.string().max(1500, "Please keep your message under 1500 characters").optional(),
  consent: z.literal(true, { error: "Please agree so we can contact you" }),
  sourcePage: z.string().max(200).optional(),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export function enquiryToWhatsApp(d: Partial<EnquiryInput>) {
  const lines = [
    "Hello Akarsh Interiors, I'm interested in interior design services.",
    d.name && `Name: ${d.name}`,
    d.phone && `Phone: ${d.phone}`,
    d.city && `City: ${d.city}`,
    d.service && `Service: ${d.service}`,
    d.propertyType && `Property: ${d.propertyType}`,
    d.area && `Size: ${d.area}`,
    d.budget && `Budget: ${d.budget}`,
    d.timeline && `Timeline: ${d.timeline}`,
    d.message && `Details: ${d.message}`,
  ];
  return lines.filter(Boolean).join("\n");
}
