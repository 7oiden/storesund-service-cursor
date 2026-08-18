import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/LogoutButton";

const links = [
  { href: "/admin", label: "Henvendelser" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/innstillinger", label: "Innstillinger" },
];

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-full bg-paper">
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
              Admin
            </p>
            <p className="text-sm text-ink-soft">{user.email}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 transition hover:bg-ink/10 hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-full px-3 py-1.5 text-ink-soft transition hover:bg-ink/10 hover:text-ink"
            >
              Til nettstedet
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-10">{children}</div>
    </div>
  );
}
