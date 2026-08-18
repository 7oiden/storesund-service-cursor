import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqList } from "@/components/contact/FaqList";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";
import { getFaqs, getSiteSettings } from "@/lib/data";
import { formatPhone, telHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Bestill time eller still et spørsmål. Skjema og e-post når Hugo også når han er offshore.",
};

export default async function ContactPage() {
  const [settings, faqs] = await Promise.all([
    getSiteSettings(),
    getFaqs(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-forest-deep py-16 text-cream lg:py-20">
        <GreenWash />
        <Container className="relative grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
              Kontakt
            </p>
            <h1 className="display mt-3 text-5xl leading-tight sm:text-6xl">
              Send en melding. Jeg svarer når jeg er tilgjengelig.
            </h1>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-cream/75">
              <li>
                Bruk skjemaet, ring eller send e-post for timebestilling og
                andre henvendelser.
              </li>
              <li>
                Jeg jobber perioder i Nordsjøen og er ikke alltid å få tak i på
                telefon. E-post og skjemaet når meg uansett.
              </li>
              <li>
                Sjekk gjerne spørsmålene under først. Finner du ikke svaret, er
                du velkommen til å ta kontakt.
              </li>
            </ul>
            <div className="mt-8 space-y-2 text-sm font-medium">
              <a href={telHref(settings.phone)} className="block hover:underline">
                {formatPhone(settings.phone)}
              </a>
              <a href={`mailto:${settings.email}`} className="block hover:underline">
                {settings.email}
              </a>
              <p className="pt-2 text-cream/60">{settings.availability_note}</p>
            </div>
          </div>
          <ContactForm />
        </Container>
      </section>

      <section id="faq" className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Spørsmål"
            title="Ofte stilte spørsmål"
            body="Korte svar om varmepumper, service og pris. Innholdet kan oppdateres fra admin."
          />
          <FaqList items={faqs} />
        </Container>
      </section>
    </>
  );
}
