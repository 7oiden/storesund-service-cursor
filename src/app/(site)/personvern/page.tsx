import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/data";
import { formatPhone, telHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description:
    "Hvordan Storesund Service samler inn og bruker personopplysninger fra kontaktskjema og serviceavtale.",
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <section className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
          Personvern
        </p>
        <h1 className="display mt-3 text-4xl leading-tight sm:text-5xl">
          Personvernerklæring
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Nettstedet samler inn så lite som mulig, og bare det som trengs for å
          svare deg og holde styr på serviceavtaler. Det brukes ikke
          analyseverktøy, reklamecookies eller sporing.
        </p>

        <div className="mt-12 space-y-10 text-base leading-7 text-ink-soft">
          <section>
            <h2 className="font-semibold text-ink">Behandlingsansvarlig</h2>
            <p className="mt-3">
              Hugo Storesund, Storesund Service, er behandlingsansvarlig for
              personopplysningene som samles inn via dette nettstedet.
            </p>
            <ul className="mt-3 space-y-1">
              <li>{settings.address}</li>
              <li>Org.nr. {settings.org_nr}</li>
              <li>
                <a
                  href={telHref(settings.phone)}
                  className="text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest"
                >
                  {formatPhone(settings.phone)}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest"
                >
                  {settings.email}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-ink">Hva som samles inn</h2>
            <p className="mt-3">
              Når du bruker kontaktskjemaet, lagres navn, e-post, telefonnummer
              og meldingen din. Når du melder deg på serviceavtale, lagres i
              tillegg adresse og eventuell merknad, samt datoer for utført og
              neste service.
            </p>
            <p className="mt-3">
              Opplysningene brukes for å svare på henvendelsen, avtale time og
              administrere serviceavtalen. Det sendes ikke nyhetsbrev, og
              opplysningene selges ikke videre.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-ink">Rettslig grunnlag</h2>
            <p className="mt-3">
              Behandlingen skjer for å svare på en henvendelse du selv har
              sendt, og for å oppfylle en avtale når du står på
              serviceavtalelisten. Det følger av personvernforordningen artikkel
              6 nr. 1 bokstav b.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-ink">Lagring og leverandører</h2>
            <p className="mt-3">
              Henvendelser og serviceavtaler lagres hos Supabase, som drifter
              databasen. Hvis e-postvarsel er satt opp, sendes en kopi av nye
              henvendelser og påmeldinger via Resend, slik at jeg får beskjed.
              Driftsleverandøren som hoster nettstedet kan i tillegg se
              tekniske serverlogger som er nødvendige for at siden skal virke.
            </p>
            <p className="mt-3">
              Henvendelser slettes når de ikke lenger trengs for å følge opp
              saken. Serviceavtaler beholdes så lenge avtalen er aktiv, og
              deretter så lenge det er nødvendig for bokføring og oppfølging av
              kundeforholdet.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-ink">Infokapsler</h2>
            <p className="mt-3">
              Den åpne delen av nettstedet setter ikke infokapsler for analyse
              eller markedsføring. Innlogging til admin bruker nødvendige
              infokapsler for å holde sesjonen i gang. De krever ikke samtykke.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-ink">Dine rettigheter</h2>
            <p className="mt-3">
              Du kan be om innsyn, retting eller sletting av opplysningene dine,
              og du kan be om at behandlingen begrenses. Send en e-post til{" "}
              <a
                href={`mailto:${settings.email}`}
                className="text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest"
              >
                {settings.email}
              </a>
              , så tar jeg det så snart jeg kan.
            </p>
            <p className="mt-3">
              Du kan også klage til{" "}
              <a
                href="https://www.datatilsynet.no"
                target="_blank"
                rel="noreferrer"
                className="text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest"
              >
                Datatilsynet
              </a>{" "}
              hvis du mener personopplysningene dine ikke behandles i tråd med
              regelverket.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
