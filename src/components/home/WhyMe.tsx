import { whyMe } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui/Container";

export function WhyMe() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Hvorfor Storesund"
          title="Fornuftige priser. Ærlige råd. Fleksibel tid."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {whyMe.map((item, index) => (
            <article
              key={item.title}
              className="rounded-3xl border border-line bg-paper p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                0{index + 1}
              </p>
              <h3 className="display mt-4 text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
