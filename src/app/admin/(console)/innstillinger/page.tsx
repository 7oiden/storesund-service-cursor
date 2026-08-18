import { updateSettings } from "@/app/admin/actions";
import { getSiteSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="display text-4xl">Innstillinger</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Tilgjengelighet, priser og kontaktinfo som vises på nettstedet.
      </p>
      <form
        action={updateSettings}
        className="mt-8 grid gap-4 rounded-3xl border border-line bg-cream p-6"
      >
        <label className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 text-sm">
          <input
            name="is_available"
            type="checkbox"
            defaultChecked={settings.is_available}
          />
          Tilgjengelig for oppdrag (fjern avhuking når du er offshore)
        </label>
        <label className="grid gap-2 text-sm">
          Merknad om tilgjengelighet
          <textarea
            name="availability_note"
            defaultValue={settings.availability_note}
            rows={3}
            className="rounded-2xl border border-line bg-paper px-4 py-3"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="phone" label="Telefon" defaultValue={settings.phone} />
          <Field name="email" label="E-post" defaultValue={settings.email} />
          <Field name="address" label="Adresse" defaultValue={settings.address} />
          <Field name="org_nr" label="Org.nr." defaultValue={settings.org_nr} />
          <Field
            name="install_price"
            label="Pris montering (kr)"
            type="number"
            defaultValue={String(settings.install_price)}
          />
          <Field
            name="service_price"
            label="Pris service (kr)"
            type="number"
            defaultValue={String(settings.service_price)}
          />
          <Field
            name="service_discount_percent"
            label="Rabatt serviceavtale (%)"
            type="number"
            defaultValue={String(settings.service_discount_percent)}
          />
        </div>
        <button className="mt-2 w-fit cursor-pointer rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep">
          Lagre innstillinger
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="rounded-2xl border border-line bg-paper px-4 py-3"
      />
    </label>
  );
}
