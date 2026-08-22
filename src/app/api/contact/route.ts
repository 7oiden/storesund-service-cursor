import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { defaultSettings } from "@/lib/site";
import { contactSchema, fieldErrorsFromZod } from "@/lib/validation";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Sjekk at alle feltene er fylt ut riktig.",
        fields: fieldErrorsFromZod(parsed.error),
      },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert(parsed.data);

  if (error) {
    return Response.json(
      { error: "Kunne ikke lagre meldingen. Prøv igjen senere." },
      { status: 500 },
    );
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_NOTIFY_EMAIL || defaultSettings.email;
    const from =
      process.env.RESEND_FROM || "Storesund Service <beth.t@example.com>";

    await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `Ny henvendelse fra ${parsed.data.name}`,
      text: [
        `Navn: ${parsed.data.name}`,
        `E-post: ${parsed.data.email}`,
        `Telefon: ${parsed.data.phone}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });
  }

  return Response.json({ ok: true });
}
