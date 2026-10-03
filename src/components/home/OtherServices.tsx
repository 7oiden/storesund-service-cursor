import type { HomeContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

export function OtherServiceTags({
  tags,
  className,
  tone = "light",
}: {
  tags: string[];
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
            dark
              ? "border-white/15 bg-white/5 text-cream/80"
              : "border-line bg-paper text-ink-soft",
          )}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-copper/80" />
          {tag}
        </span>
      ))}
    </div>
  );
}

export function OtherServices({ content }: { content: HomeContent }) {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Andre anlegg"
            title="Ikke bare luft-til-luft."
            body={content.otherIntro}
          />
          <OtherServiceTags tags={content.otherTags} className="mt-8" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {content.otherPhotos.slice(0, 4).map((photo) => (
            <Photo
              key={photo.src}
              photo={photo}
              className="aspect-square rounded-2xl"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
