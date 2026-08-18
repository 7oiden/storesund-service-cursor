import type { Metadata } from "next";
import {
  Checklist,
  PriceBar,
  ServiceHero,
} from "@/components/services/ServiceBlocks";
import { Container } from "@/components/ui/Container";
import { repairExamples } from "@/lib/content";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reparasjon",
  description:
    "Gratis feilsøking og ærlig vurdering før du bytter varmepumpe.",
};

export default async function RepairPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <ServiceHero
        title="Reparasjon."
        heading="Hvorfor kjøpe ny varmepumpe når den du har kan reddes?"
        image="repair"
        points={[
          "Mange feil kan løses med en enkel reparasjon, i stedet for ny pumpe og ny montering.",
          "Hvis reparasjon likevel ikke lønner seg, hjelper jeg med en prisgunstig erstatning via leverandøravtaler.",
          "Ta kontakt for gratis befaring med feilsøking og prisestimat.",
        ]}
      />
      <section className="py-16 lg:py-24">
        <Container className="space-y-6">
          <PriceBar settings={settings} kind="repair" />
          <Checklist
            title="Eksempler på jobber jeg tar"
            items={repairExamples}
          />
        </Container>
      </section>
    </>
  );
}
