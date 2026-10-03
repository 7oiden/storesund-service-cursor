import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OtherServices } from "@/components/home/OtherServices";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";
import { IconBadge } from "@/components/ui/IconBadge";
import { servicePrices } from "@/components/services/ServiceCard";
import { serviceIcons } from "@/components/services/serviceIcons";
import { serviceNav } from "@/lib/content";
import { getHomeContent, getServiceSummaries, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tjenester",
  description:
    "Montering, service og reparasjon av varmepumper i Bergensområdet.",
};

export default async function ServicesPage() {
  const [settings, summaries, home] = await Promise.all([
    getSiteSettings(),
    getServiceSummaries(),
    getHomeContent(),
  ]);
  const prices = servicePrices(settings);

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
              className="group flex flex-col justify-between gap-6 rounded-3xl border border-line bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-[0_18px_40px_-24px_rgb(14_58_41/0.45)] sm:flex-row sm:items-center sm:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <IconBadge icon={serviceIcons[service.slug]} size="lg" />
                <div>
                  <span className="inline-flex rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
                    {prices[service.slug]}
                  </span>
                  <h2 className="display mt-3 text-3xl text-ink">
                    {service.label}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
                    {summaries[service.slug]}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-forest">
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
      <OtherServices content={home} />
    </>
  );
}
