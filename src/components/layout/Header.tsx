"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { availabilityStatusLabel, type SiteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="bg-ink text-cream">
        <p className="mx-auto flex max-w-6xl items-center justify-center gap-1.5 px-5 py-1.5 text-xs font-medium tracking-wide sm:px-8">
          <MapPin size={13} strokeWidth={1.75} />
          Varmepumpe i Bergen og omegn
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition",
                    active
                      ? "text-forest after:absolute after:inset-x-0 after:top-full after:mt-1 after:h-0.5 after:bg-forest"
                      : "text-ink-soft hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <AvailabilityDot available={settings.is_available} />
            <ButtonLink href="/kontakt">Be om time</ButtonLink>
          </div>

          <button
            type="button"
            className="rounded-full border border-line p-2 text-ink lg:hidden"
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:hidden",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
          inert={!open}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-1 border-t border-line bg-cream px-5 py-5">
              {navLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "border-l-2 py-1 pl-3 text-base font-medium",
                      active
                        ? "border-forest text-forest"
                        : "border-transparent text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-3">
                <AvailabilityDot available={settings.is_available} />
              </div>
              <ButtonLink href="/kontakt" className="mt-2">
                Be om time
              </ButtonLink>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

function AvailabilityDot({ available }: { available: boolean }) {
  return (
    <p className="flex items-center gap-2 text-xs font-medium text-ink-soft">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          available ? "bg-forest" : "bg-copper",
        )}
      />
      {availabilityStatusLabel(available)}
    </p>
  );
}
