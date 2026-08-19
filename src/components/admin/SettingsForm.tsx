"use client";

import { useActionState, useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { updateSettings } from "@/app/admin/actions";
import type { SiteSettings } from "@/lib/site";

const initialState = { error: "", success: false, savedAt: 0 };
const SUCCESS_TIMEOUT_MS = 6000;

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, action, pending] = useActionState(updateSettings, initialState);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!state.success || !state.savedAt) return;
    setShowSuccess(true);
    const timer = window.setTimeout(() => setShowSuccess(false), SUCCESS_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [state.success, state.savedAt]);

  return (
    <form action={action} className="mt-4 grid gap-4 rounded-3xl border border-line bg-cream p-6">
      <label className="grid gap-2 text-sm">
        Merknad om tilgjengelighet
        <textarea
          name="availability_note"
          defaultValue={settings.availability_note}
          rows={3}
          className="rounded-2xl border border-line bg-field px-4 py-3"
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
      {state.error ? (
        <p className="rounded-2xl bg-danger/20 px-4 py-3 text-sm">{state.error}</p>
      ) : null}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="w-fit cursor-pointer rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Lagrer…" : "Lagre innstillinger"}
        </button>
        {showSuccess ? (
          <p className="flex items-center gap-2 text-sm font-medium text-forest">
            <CircleCheck size={16} />
            Innstillingene er lagret.
          </p>
        ) : null}
      </div>
    </form>
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
        className="rounded-2xl border border-line bg-field px-4 py-3"
      />
    </label>
  );
}
