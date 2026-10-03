import type { Metadata } from "next";
import { RefreshCw, Wrench } from "lucide-react";
import {
  Checklist,
  DETAILS_ID,
  FactStrip,
  PriceAside,
  ProcessSteps,
  RelatedServices,
  ServiceHero,
} from "@/components/services/ServiceBlocks";
import { Container, SectionHeading } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  getRepairContent,
  getServiceSummaries,
  getSiteSettings,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Reparasjon",
  description:
    "Gratis feilsøking og ærlig vurdering før du bytter varmepumpe.",
};

export default async function RepairPage() {
  const [settings, content, summaries] = await Promise.all([
    getSiteSettings(),
    getRepairContent(),
    getServiceSummaries(),
  ]);

  return (
    <>
      <ServiceHero
        slug="reparasjon"
        heading={content.heroHeading}
        photo={content.heroPhoto}
        badge={{ label: "Feilsøking og prisestimat", value: "Gratis befaring" }}
        detailsLabel="Se hva jeg reparerer"
        points={content.heroPoints}
      />
      <FactStrip
        facts={[
          { value: "0 kr", label: "for befaring og feilsøking" },
          { value: "Alle", label: "typer og merker varmepumper" },
          { value: "20+ år", label: "erfaring med varmepumper" },
          { value: "Kat. I", label: "f-gass sertifisert" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Reparere eller bytte?"
            title="En ærlig vurdering før du bytter."
            body="Etter feilsøkingen får du en ærlig vurdering av hva som faktisk lønner seg for deg."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl bg-forest-deep p-8 text-cream">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <IconBadge icon={Wrench} tone="dark" size="lg" />
                  <span className="rounded-full bg-copper px-3 py-1 text-xs font-semibold text-white">
                    Ofte best
                  </span>
                </div>
                <h3 className="display mt-6 text-3xl">Reparere</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-cream/80">
                  {content.repairPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <article className="rounded-3xl border border-line bg-cream p-8">
              <IconBadge icon={RefreshCw} size="lg" />
              <h3 className="display mt-6 text-3xl text-ink">Bytte</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-ink-soft">
                {content.replacePoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-copper/70" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <ProcessSteps title={content.stepsTitle} steps={content.steps} />

      <section id={DETAILS_ID} className="scroll-mt-24 py-16 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8">
          <Checklist
            title="Eksempler på jobber jeg tar"
            items={content.examples}
            columns={2}
          />
          <PriceAside
            label="Feilsøking og estimat"
            value="Gratis"
            note="Reparasjon prissettes etter befaring."
            points={[
              "Feilsøking på stedet",
              "Ærlig vurdering av reparasjon mot bytte",
              "Prisestimat før arbeidet starter",
            ]}
            settings={settings}
          />
        </Container>
      </section>

      <RelatedServices
        current="reparasjon"
        settings={settings}
        summaries={summaries}
      />
    </>
  );
}
