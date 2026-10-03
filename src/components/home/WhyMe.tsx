import type { HomeContent } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { homeIcons } from "./homeIcons";

export function WhyMe({ items }: { items: HomeContent["whyMe"] }) {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Hvorfor velge Storesund Service"
          title="Klare priser. Tid som passer deg."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-3xl border border-line bg-paper p-7 transition duration-300 hover:border-forest/25"
            >
              <div className="flex items-start justify-between gap-4">
                <IconBadge icon={homeIcons[item.icon]} />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper/80">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="display mt-5 text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
