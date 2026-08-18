import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/home/CtaBand";
import { OtherServices } from "@/components/home/OtherServices";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";
import { serviceNav } from "@/lib/content";
import { getSiteSettings } from "@/lib/data";
import { formatNok } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tjenester",
  description:
    "Montering, service og reparasjon av varmepumper i Bergensområdet.",
};

export default async function ServicesPage() {
  const settings = await getSiteSettings();
  const prices = {
    montering: `${formatNok(settings.install_price)} inkl. mva`,
    service: `${formatNok(settings.service_price)} inkl. mva`,
    reparasjon: "Etter befaring",
  };

  return (
    <>
      <section className="relative overflow-hidden bg-forest-deep py-16 text-cream lg:py-24">
        <GreenWash />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Tjenester"
            title="Montering, service og reparasjon – uten overraskelser."
          />
          <p className="mt-5 max-w-2xl text-base leading-7 text-cream/70">
            Fastpris på det som er standard. Åpent tilbud på det som ikke er
            det. Jeg jobber med alle merker, også pumper du har kjøpt selv.
          </p>
        </Container>
      </section>
      <section className="py-16 lg:py-24">
        <Container className="grid gap-5">
          {serviceNav.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col justify-between gap-6 rounded-3xl border border-line bg-cream p-8 transition hover:border-forest/30 sm:flex-row sm:items-center"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
                  {prices[service.slug]}
                </p>
                <h2 className="display mt-2 text-3xl text-ink">
                  {service.label}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
                  {service.summary}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest">
                Les mer
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </Container>
      </section>
      <OtherServices />
      <CtaBand />
    </>
  );
}
