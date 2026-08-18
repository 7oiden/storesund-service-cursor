import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/actions";

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
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-forest">
                {link.label}
              </Link>
            ))}
            <Link href="/" className="text-ink-soft hover:text-ink">
              Til nettstedet
            </Link>
            <form action={signOut}>
              <button type="submit" className="text-ink-soft hover:text-ink">
                Logg ut
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-10">{children}</div>
    </div>
  );
}
