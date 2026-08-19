import { AvailabilityCard } from "@/components/admin/AvailabilityCard";
import { PasswordForm } from "@/components/admin/PasswordForm";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="display text-4xl">Innstillinger</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Tilgjengelighet, priser og kontaktinfo som vises på nettstedet.
      </p>
      <AvailabilityCard available={settings.is_available} />
      <SettingsForm settings={settings} />

      <section className="mt-8 rounded-3xl border border-line bg-cream p-6">
        <h2 className="display text-2xl">Passord</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Bytt passordet du bruker for å logge inn i admin.
        </p>
        <PasswordForm />
      </section>
    </div>
  );
}
