"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Henvendelser" },
  { href: "/admin/serviceavtaler", label: "Serviceavtaler" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/innstillinger", label: "Innstillinger" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-7 text-sm">
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative font-medium tracking-wide transition",
              active
                ? "text-forest after:absolute after:inset-x-0 after:top-full after:mt-1 after:h-0.5 after:bg-forest"
                : "text-ink-soft hover:text-ink",
            )}
          >
            {link.label}
          </Link>
        );
      })}
      <Link
        href="/"
        className="relative font-medium tracking-wide text-ink-soft transition hover:text-ink"
      >
        Til nettstedet
      </Link>
      <LogoutButton />
    </nav>
  );
}
