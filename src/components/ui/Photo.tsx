import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Photo({
  photo,
  className,
  priority = false,
}: {
  photo: PhotoData;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-forest-deep", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        style={photo.position ? { objectPosition: photo.position } : undefined}
        priority={priority}
      />
    </div>
  );
}
