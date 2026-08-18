import type { Metadata } from "next";
import {
  Checklist,
  InfoCard,
  PriceBar,
  ServiceHero,
} from "@/components/services/ServiceBlocks";
import { Container } from "@/components/ui/Container";
import { serviceIncluded } from "@/lib/content";
import { getSiteSettings } from "@/lib/data";
import { formatNok } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Service",
  description:
    "Fastpris service på luft-til-luft varmepumpe. Anbefales annethvert år.",
};

export default async function ServicePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <ServiceHero
        title="Service."
        heading="Sikre lang levetid og god energieffektivitet med regelmessig service."
        image="service"
        price={`${formatNok(settings.service_price)} inkl. mva for standard service`}
        points={[
          "En godt vedlikeholdt varmepumpe holder strømregningen nede. Smuss på lamellene gir merkbart dårligere ytelse over tid.",
          "Regelmessig service gjør det lettere å oppdage slitasje før den blir kostbar å utbedre.",
          "Anbefalingen er service annethvert år, i tillegg til jevnlig rengjøring du gjør selv.",
        ]}
      />
      <section className="py-16 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <PriceBar settings={settings} kind="service" />
            <Checklist
              title="Dette inngår i en standard service"
              items={serviceIncluded}
            />
          </div>
          <div className="space-y-6">
            <InfoCard title="Serviceavtale">
              <p>
                En fast avtale gjør at servicen ikke glemmes. Du får{" "}
                {settings.service_discount_percent} % rabatt på de neste
                servicene når avtalen er i gang.
              </p>
            </InfoCard>
            <InfoCard title="Rengjøring mellom servicene">
              <p>
                Støvsug eller vask filteret, tørk av med en klut og støvsug
                innedelen før filteret settes på plass. Det gir bedre
                luftsirkulasjon og lenger levetid.
              </p>
              <p>
                Utedelen trenger også tilsyn: hold den fri for støv, løv og snø
                om vinteren.
              </p>
            </InfoCard>
          </div>
        </Container>
      </section>
    </>
  );
}
