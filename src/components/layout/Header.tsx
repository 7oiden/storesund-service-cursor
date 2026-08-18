"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, serviceNav } from "@/lib/content";
import type { SiteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
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
                className={cn(
                  "text-sm font-medium tracking-wide transition",
                  active ? "text-forest" : "text-ink-soft hover:text-ink",
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

      {open ? (
        <div className="border-t border-line bg-cream px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="grid gap-2 pt-2">
              {serviceNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-ink-soft"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <AvailabilityDot available={settings.is_available} />
            <ButtonLink href="/kontakt" className="mt-2">
              Be om time
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
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
      {available ? "Tilgjengelig for oppdrag" : "Offshore nå – svarer på e-post"}
    </p>
  );
}
