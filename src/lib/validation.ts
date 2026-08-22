import { z } from "zod";

const name = z
  .string()
  .trim()
  .min(3, "Skriv inn minst 3 tegn.")
  .max(80, "Navnet kan være på maks 80 tegn.");

const email = z
  .string()
  .trim()
  .min(1, "Skriv inn e-postadressen.")
  .email("Skriv inn en gyldig e-postadresse.");

const phone = z
  .string()
  .trim()
  .min(8, "Skriv inn minst 8 siffer.")
  .max(20, "Telefonnummeret er for langt.");

export const contactSchema = z.object({
  name,
  email,
  phone,
  message: z
    .string()
    .trim()
    .min(10, "Meldingen må være på minst 10 tegn.")
    .max(800, "Meldingen kan være på maks 800 tegn."),
});

export const agreementSchema = z.object({
  name,
  email,
  phone,
  address: z
    .string()
    .trim()
    .min(5, "Skriv inn adressen.")
    .max(120, "Adressen kan være på maks 120 tegn."),
  note: z.string().trim().max(240, "Merknaden kan være på maks 240 tegn.").optional().default(""),
  source: z.enum(["qr", "web"]).optional().default("qr"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AgreementInput = z.infer<typeof agreementSchema>;
export type FieldErrors = Record<string, string>;

export function fieldErrorsFromZod(error: {
  issues: Array<{ path: PropertyKey[]; message: string }>;
}): FieldErrors {
  const fields: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !fields[key]) fields[key] = issue.message;
  }
  return fields;
}
