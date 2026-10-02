import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceNav } from "@/lib/content";
import type { SiteSettings } from "@/lib/site";
import { formatNok } from "@/lib/utils";
import { IconBadge } from "@/components/ui/IconBadge";
import { serviceIcons, type ServiceSlug } from "./serviceIcons";

export function servicePrices(settings: SiteSettings): Record<ServiceSlug, string> {
  return {
    montering: `${formatNok(settings.install_price)} inkl. mva`,
    service: `${formatNok(settings.service_price)} inkl. mva`,
    reparasjon: "Gratis befaring",
  };
}

export function ServiceCard({
  service,
  price,
}: {
  service: (typeof serviceNav)[number];
  price: string;
}) {
  return (
    <Link
      href={service.href}
      className="reveal group flex flex-col rounded-3xl bg-forest-deep p-7 text-cream transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(14_58_41/0.6)]"
    >
      <div className="flex items-start justify-between gap-4">
        <IconBadge icon={serviceIcons[service.slug]} tone="dark" />
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-cream/80">
          {price}
        </span>
      </div>
      <h3 className="display mt-6 text-3xl">{service.label}</h3>
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
  );
}
