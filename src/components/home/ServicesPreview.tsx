import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { serviceNav } from "@/lib/content";
import type { SiteSettings } from "@/lib/site";
import { formatNok } from "@/lib/utils";
import { Container, SectionHeading } from "@/components/ui/Container";

export function ServicesPreview({ settings }: { settings: SiteSettings }) {
  const prices: Record<string, string> = {
    montering: `${formatNok(settings.install_price)} inkl. mva`,
    service: `${formatNok(settings.service_price)} inkl. mva`,
    reparasjon: "Etter befaring",
  };

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Standard tjenester"
          title="Tre tydelige jobber, med priser du kan stole på."
          body="Luft-til-luft i vanlig trehus med god atkomst. Trenger du noe annet, gir jeg et eget tilbud."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {serviceNav.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col rounded-3xl bg-forest-deep p-7 text-cream transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
                {prices[service.slug]}
              </p>
              <h3 className="display mt-4 text-3xl">{service.label}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-cream/70">
                {service.summary}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Les mer
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
