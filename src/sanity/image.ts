import { createImageUrlBuilder } from "@sanity/image-url";
import type { Photo } from "@/lib/content";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

type Rect = { top: number; bottom: number; left: number; right: number };

export type SanityImage = {
  asset?: { _ref: string };
  alt?: string;
  crop?: Rect;
  hotspot?: { x: number; y: number };
} | null;

function percent(value: number) {
  return `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%`;
}

/** Turns a Sanity image into a Photo, or returns the fallback if empty. */
export function toPhoto(image: SanityImage | undefined, fallback: Photo): Photo {
  if (!image?.asset?._ref) return fallback;

  const src = builder.image(image).width(2400).fit("max").auto("format").url();

  // Photos are rendered with object-cover, so the hotspot becomes
  // object-position, relative to the cropped image.
  let position: string | undefined;
  if (image.hotspot) {
    const crop = image.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
    const width = 1 - crop.left - crop.right || 1;
    const height = 1 - crop.top - crop.bottom || 1;
    position = `${percent((image.hotspot.x - crop.left) / width)} ${percent(
      (image.hotspot.y - crop.top) / height,
    )}`;
  }

  return { src, alt: image.alt?.trim() || fallback.alt, position };
}
