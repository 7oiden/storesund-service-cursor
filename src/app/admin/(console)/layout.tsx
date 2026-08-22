import { ArrowUpRight } from "lucide-react";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { rentalAdminUrl } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

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
      <header className="border-b border-line bg-forest/10">
        <div className="h-1.5 bg-forest" aria-hidden="true" />
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest">
              Varmepumpe
              <a
                href={rentalAdminUrl}
                title="Åpne utleie-admin"
                aria-label="Åpne utleie-admin"
                className="text-forest/45 transition hover:text-forest"
              >
                <ArrowUpRight className="size-3.5" strokeWidth={2.25} aria-hidden />
              </a>
            </p>
            <p className="text-sm text-ink-soft">Admin · {user.email}</p>
          </div>
          <AdminNav />
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-10">{children}</div>
    </div>
  );
}
