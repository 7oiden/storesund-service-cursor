import { serviceNav, type ServiceSlug } from "@/lib/content";
import type { SiteSettings } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ServiceCard, servicePrices } from "@/components/services/ServiceCard";

export function ServicesPreview({
  settings,
  summaries,
}: {
  settings: SiteSettings;
  summaries: Record<ServiceSlug, string>;
}) {
  const prices = servicePrices(settings);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Standard tjenester"
          title="Priser du kan stole på."
          body="Svært konkuransedyktige priser. Forutsetter montering av luft-til-luft varmepumpe i vanlig trehus med god tilkomst. Trenger du noe annet, ta kontakt, så gir jeg et eget tilbud."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {serviceNav.map((service) => (
            <ServiceCard
              key={service.href}
              service={service}
              summary={summaries[service.slug]}
              price={prices[service.slug]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
