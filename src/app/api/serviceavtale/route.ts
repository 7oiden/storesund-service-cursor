import { Resend } from "resend";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { defaultSettings } from "@/lib/site";
import { SERVICE_INTERVAL_YEARS, addYearsIso, isoDate } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(3).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20),
  address: z.string().trim().min(5).max(120),
  note: z.string().trim().max(240).optional().default(""),
  source: z.enum(["qr", "web"]).optional().default("qr"),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return Response.json(
      { error: "Sjekk at alle feltene er fylt ut riktig." },
      { status: 400 },
    );
  }

  const today = isoDate();
  const payload = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    address: parsed.data.address,
    note: parsed.data.note,
    source: parsed.data.source,
    status: "active" as const,
    last_serviced_at: today,
    next_due_at: addYearsIso(new Date(), SERVICE_INTERVAL_YEARS),
  };

  const supabase = await createClient();
  const { error } = await supabase.from("service_agreements").insert(payload);

  if (error) {
    return Response.json(
      { error: "Kunne ikke lagre avtalen. Prøv igjen senere." },
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
      subject: `Ny serviceavtale: ${parsed.data.name}`,
      text: [
        `Navn: ${parsed.data.name}`,
        `E-post: ${parsed.data.email}`,
        `Telefon: ${parsed.data.phone}`,
        `Adresse: ${parsed.data.address}`,
        parsed.data.note ? `Merknad: ${parsed.data.note}` : "",
        `Kilde: ${parsed.data.source}`,
        `Neste service: ${payload.next_due_at}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  return Response.json({ ok: true });
}
