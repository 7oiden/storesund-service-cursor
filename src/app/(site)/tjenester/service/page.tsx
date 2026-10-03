import type { Metadata } from "next";
import {
  AirVent,
  ArrowRight,
  Cable,
  CalendarCheck,
  Fan,
  Snowflake,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";
import {
  CheckList,
  DETAILS_ID,
  FactStrip,
  FeatureCard,
  PriceAside,
  ProcessSteps,
  RelatedServices,
  ServiceHero,
} from "@/components/services/ServiceBlocks";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, SectionHeading } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import type { CheckGroupIcon } from "@/lib/content";
import {
  getMaintenanceContent,
  getServiceSummaries,
  getSiteSettings,
} from "@/lib/data";
import { formatNok } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Service",
  description:
    "Fastpris service på luft-til-luft varmepumpe. Anbefales annethvert år.",
};

const groupIcons: Record<CheckGroupIcon, LucideIcon> = {
  indoor: AirVent,
  outdoor: Fan,
  pipes: Cable,
  refrigerant: Thermometer,
};

export default async function ServicePage() {
  const [settings, content, summaries] = await Promise.all([
    getSiteSettings(),
    getMaintenanceContent(),
    getServiceSummaries(),
  ]);
  const checkpointCount = content.checkGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );
  const discount = settings.service_discount_percent;

  return (
    <>
      <ServiceHero
        slug="service"
        heading={content.heroHeading}
        photo={content.heroPhoto}
        badge={{
          label: "Fastpris standard service",
          value: `${formatNok(settings.service_price)} inkl. mva`,
        }}
        points={content.heroPoints}
      />
      <FactStrip
        facts={[
          { value: "2 år", label: "anbefalt serviceintervall" },
          { value: `${discount} %`, label: "rabatt med serviceavtale" },
          { value: String(checkpointCount), label: "kontrollpunkter per service" },
          { value: "Kveld", label: "hjemmebesøk uten tillegg" },
        ]}
      />

      <section id={DETAILS_ID} className="scroll-mt-24 py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-8">
          <div>
            <SectionHeading
              eyebrow="Standard service"
              title="Dette inngår i en service."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {content.checkGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-3xl border border-line bg-cream p-7"
                >
                  <div className="flex items-center gap-3">
                    <IconBadge icon={groupIcons[group.icon]} />
                    <h3 className="display text-xl text-ink">{group.title}</h3>
                  </div>
                  <CheckList items={group.items} className="mt-5" />
                </article>
              ))}
            </div>
          </div>
          <PriceAside
            label="Standard service"
            value={formatNok(settings.service_price)}
            note="inkl. mva"
            points={[
              "Rens, kontroll og funksjonstest",
              "Testrapport etter utført arbeid",
              `${discount} % rabatt med serviceavtale`,
            ]}
            settings={settings}
          />
        </Container>
      </section>

      <ProcessSteps title={content.stepsTitle} steps={content.steps} />

      <section className="py-16 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[2rem] border border-copper/25 bg-copper/[0.07] p-8 sm:p-10">
            <div>
              <div className="flex items-center gap-3">
                <IconBadge icon={CalendarCheck} tone="copper" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                  Serviceavtale
                </p>
              </div>
              <p className="display mt-6 text-7xl leading-none text-copper sm:text-8xl">
                {discount} %
              </p>
              <h2 className="display mt-4 text-3xl text-ink">
                rabatt på de neste servicene.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-ink-soft">
                En fast avtale gjør at servicen ikke glemmes. Jeg tar kontakt
                når det er tid, og du betaler etter jobben er gjort.
              </p>
            </div>
            <ButtonLink href="/serviceavtale" className="self-start">
              Meld deg på serviceavtale
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
          <div className="grid gap-6">
            <FeatureCard icon={Wind} title={content.tipIndoor.title}>
              {content.tipIndoor.body}
            </FeatureCard>
            <FeatureCard icon={Snowflake} title={content.tipOutdoor.title}>
              {content.tipOutdoor.body}
            </FeatureCard>
          </div>
        </Container>
      </section>

      <RelatedServices
        current="service"
        settings={settings}
        summaries={summaries}
      />
    </>
  );
}
