"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
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
    <form onSubmit={onSubmit} className="rounded-3xl bg-ink p-7 text-cream">
      <h2 className="display text-3xl">Send en melding</h2>
      <p className="mt-2 text-sm text-cream/65">
        Jeg svarer så snart jeg kan – også når jeg er offshore.
      </p>

      <div className="mt-6 grid gap-4">
        <Field label="Navn" name="name" required minLength={3} maxLength={80} />
        <Field label="E-post" name="email" type="email" required />
        <Field label="Telefon" name="phone" required />
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-cream/80">Melding</span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={800}
            rows={6}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cream outline-none focus:border-cream/40"
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="cursor-pointer rounded-full bg-copper px-5 py-3 text-sm font-semibold text-cream transition hover:bg-copper/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sender…" : "Send melding"}
        </button>
      </div>

      {status === "success" ? (
        <p className="mt-4 rounded-2xl bg-forest/40 px-4 py-3 text-sm">
          Takk for meldingen. Jeg kommer tilbake til deg så snart jeg kan.
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
      <span className="font-medium text-cream/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cream outline-none focus:border-cream/40"
      />
    </label>
  );
}
