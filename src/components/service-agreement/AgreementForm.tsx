"use client";

import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const SUCCESS_TIMEOUT_MS = 8000;

export function AgreementForm({ source = "qr" }: { source?: "qr" | "web" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const timer = window.setTimeout(() => setStatus("idle"), SUCCESS_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/serviceavtale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setError(data.error || "Noe gikk galt. Prøv igjen senere.");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Noe gikk galt. Prøv igjen senere.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-cream p-6 text-ink sm:p-8"
    >
      <h2 className="display text-3xl">Meld deg på</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Du betaler etter hver service, med rabatt på de neste.
      </p>

      <input type="hidden" name="source" value={source} />

      <div className="mt-6 grid gap-4">
        <Field label="Navn" name="name" required minLength={3} maxLength={80} />
        <Field label="Telefon" name="phone" type="tel" required />
        <Field label="E-post" name="email" type="email" required />
        <Field
          label="Adresse"
          name="address"
          required
          minLength={5}
          maxLength={120}
        />
        <label className="grid gap-2 text-sm">
          <span className="font-medium">
            Merknad <span className="font-normal text-ink-soft">(valgfritt)</span>
          </span>
          <textarea
            name="note"
            maxLength={240}
            rows={3}
            placeholder="F.eks. merke på pumpen, eller hvilken bolig"
            className="rounded-2xl border border-line bg-field px-4 py-3.5 text-base outline-none focus:border-forest"
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 mr-auto w-fit cursor-pointer rounded-full bg-copper px-6 py-3.5 text-base font-semibold text-cream transition hover:bg-copper/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sender…" : "Start serviceavtale"}
        </button>
      </div>

      {status === "success" ? (
        <p className="mt-4 flex items-start gap-3 rounded-2xl bg-forest px-4 py-3 text-sm text-cream">
          <CircleCheck size={18} className="mt-0.5 shrink-0" />
          Takk. Du er med på serviceavtalen. Jeg tar kontakt når det nærmer
          seg neste service.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 rounded-2xl bg-danger/20 px-4 py-3 text-sm">{error}</p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  minLength,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className="rounded-2xl border border-line bg-field px-4 py-3.5 text-base outline-none focus:border-forest"
      />
    </label>
  );
}
