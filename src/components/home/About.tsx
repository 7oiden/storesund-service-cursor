import type { HomeContent } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

export function About({ content }: { content: HomeContent }) {
  const paragraphs = content.aboutBody
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Photo
          photo={content.aboutPhoto}
          className="aspect-[4/5] rounded-[2rem]"
        />
        <div>
          <SectionHeading eyebrow="Om meg" title={content.aboutHeading} />
          <div className="mt-6 space-y-4 text-base leading-7 text-ink-soft">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
