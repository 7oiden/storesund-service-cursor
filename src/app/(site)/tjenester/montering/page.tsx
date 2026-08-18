import type { Metadata } from "next";
import {
  Checklist,
  InfoCard,
  PriceBar,
  ServiceHero,
} from "@/components/services/ServiceBlocks";
import { Container } from "@/components/ui/Container";
import {
  installationExcluded,
  installationIncluded,
  installationParts,
} from "@/lib/content";
import { getSiteSettings } from "@/lib/data";
import { formatNok } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Montering",
  description:
    "Fastpris montering av luft-til-luft varmepumpe i Bergensområdet.",
};

export default async function InstallationPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <ServiceHero
        title="Montering."
        heading="Jeg monterer og demonterer alle typer varmepumper, også de du har kjøpt selv."
        image="install"
        price={`${formatNok(settings.install_price)} inkl. mva for standard montasje`}
        points={[
          "Fastpris på standard montasje gjelder luft-til-luft uansett merke, i bolig med trevegg og god atkomst.",
          "Kjøring og nødvendig utstyr for en klar-til-bruk installasjon er inkludert, forutsatt at elektrisk tilkobling for utedel er på plass.",
          "Ta kontakt for time, eller for pristilbud på andre typer varmepumper og anlegg utenom standard.",
        ]}
      />
      <section className="py-16 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <PriceBar settings={settings} kind="install" />
            <Checklist
              title="Inkludert i standard montering"
              items={installationIncluded}
            />
            <Checklist title="Deler som følger med" items={installationParts} />
            <Checklist
              title="Ikke inkludert"
              items={installationExcluded}
              tone="exclude"
            />
          </div>
          <InfoCard title="Ikke bare luft-til-luft">
            <p>
              Ønsker du montering av andre typer varmepumper eller
              aircondition-anlegg, tar jeg gjerne et prisestimat.
            </p>
            <p>
              Med f-gass kategori I kan jeg også montere anlegg med over 3 kg
              kuldemedium.
            </p>
          </InfoCard>
        </Container>
      </section>
    </>
  );
}
