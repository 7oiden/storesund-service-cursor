import type { Metadata } from "next";
import { House, Layers, MoveVertical, PlugZap, type LucideIcon } from "lucide-react";
import { OtherServiceTags } from "@/components/home/OtherServices";
import {
  Checklist,
  DETAILS_ID,
  FactStrip,
  FeatureCard,
  InfoCard,
  PriceAside,
  ProcessSteps,
  RelatedServices,
  ServiceHero,
} from "@/components/services/ServiceBlocks";
import { Container, SectionHeading } from "@/components/ui/Container";
import {
  installationConditions,
  installationExcluded,
  installationIncluded,
  installationParts,
  installationSteps,
} from "@/lib/content";
import { getSiteSettings } from "@/lib/data";
import { formatNok } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Montering",
  description:
    "Fastpris montering av luft-til-luft varmepumpe i Bergensområdet.",
};

const conditionIcons: Record<
  (typeof installationConditions)[number]["icon"],
  LucideIcon
> = {
  wall: House,
  height: MoveVertical,
  power: PlugZap,
};

export default async function InstallationPage() {
  const settings = await getSiteSettings();
  const price = `${formatNok(settings.install_price)} inkl. mva`;

  return (
    <>
      <ServiceHero
        slug="montering"
        heading="Jeg monterer og demonterer alle typer varmepumper, også de du har kjøpt selv."
        image="install"
        badge={{ label: "Fastpris standard montering", value: price }}
        points={[
          "Fastpris på standard montasje gjelder luft-til-luft uansett merke, i bolig med trevegg og god atkomst.",
          "Kjøring og nødvendig utstyr for en klar-til-bruk installasjon er inkludert, forutsatt at elektrisk tilkobling for utedel er på plass.",
          "Ta kontakt for time, eller for pristilbud på andre typer varmepumper og anlegg utenom standard.",
        ]}
      />
      <FactStrip
        facts={[
          { value: "5 m", label: "rør og signalkabel inkludert" },
          { value: "50 km", label: "kjøring tur-retur inkludert" },
          { value: "Alle", label: "merker, også pumper du har kjøpt selv" },
          { value: "Kat. I", label: "f-gass sertifisert" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Standard montering"
            title="Når gjelder fastprisen?"
            body="Fastprisen forutsetter tre ting. Ligger jobben utenfor, får du et eget tilbud."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {installationConditions.map((condition) => (
              <FeatureCard
                key={condition.title}
                icon={conditionIcons[condition.icon]}
                title={condition.title}
              >
                {condition.body}
              </FeatureCard>
            ))}
          </div>
        </Container>
      </section>

      <ProcessSteps
        title="Fra avklaring til varme i huset."
        steps={installationSteps}
      />

      <section id={DETAILS_ID} className="scroll-mt-24 py-16 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8">
          <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <Checklist
                title="Inkludert i montering"
                items={installationIncluded}
              />
              <Checklist title="Deler som følger med" items={installationParts} />
            </div>
            <Checklist
              title="Ikke inkludert"
              items={installationExcluded}
              tone="exclude"
            />
            <InfoCard title="Ikke bare luft-til-luft" icon={Layers}>
              <p>
                Ønsker du montering av andre typer varmepumper eller
                aircondition-anlegg, tar jeg gjerne et prisestimat. Med f-gass
                kategori I kan jeg også montere anlegg med over 3 kg
                kuldemedium.
              </p>
              <OtherServiceTags tone="dark" className="pt-2" />
            </InfoCard>
          </div>
          <PriceAside
            label="Standard montering"
            value={formatNok(settings.install_price)}
            note="inkl. mva"
            points={[
              "Luft-til-luft, alle merker",
              "Rør, kabler og braketter inkludert",
              "Testrapport ved igangkjøring",
            ]}
            settings={settings}
          />
        </Container>
      </section>

      <RelatedServices current="montering" settings={settings} />
    </>
  );
}
