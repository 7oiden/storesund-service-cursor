"use client";

import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import {
  contactSchema,
  fieldErrorsFromZod,
  type FieldErrors,
} from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

const SUCCESS_TIMEOUT_MS = 6000;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (status !== "success") return;
    const timer = window.setTimeout(() => setStatus("idle"), SUCCESS_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  function clearField(name: string) {
    setFieldErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      setFieldErrors(fieldErrorsFromZod(parsed.error));
      setStatus("idle");
      return;
    }

    setFieldErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as {
        error?: string;
        fields?: FieldErrors;
      };

      if (!response.ok) {
        if (data.fields) {
          setFieldErrors(data.fields);
          setStatus("idle");
          return;
        }
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
      noValidate
      onSubmit={onSubmit}
      className="rounded-3xl bg-ink p-7 text-cream"
    >
      <h2 className="display text-3xl">Send en melding</h2>
      <p className="mt-2 text-sm text-cream/65">
        Jeg svarer så snart jeg kan – også når jeg er offshore.
      </p>

      <div className="mt-6 grid gap-4">
        <Field
          label="Navn"
          name="name"
          error={fieldErrors.name}
          onChange={() => clearField("name")}
        />
        <Field
          label="E-post"
          name="email"
          type="email"
          error={fieldErrors.email}
          onChange={() => clearField("email")}
        />
        <Field
          label="Telefon"
          name="phone"
          error={fieldErrors.phone}
          onChange={() => clearField("phone")}
        />
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-cream/80">Melding</span>
          <textarea
            name="message"
            maxLength={800}
            rows={6}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            onChange={() => clearField("message")}
            className={`rounded-2xl border bg-white/5 px-4 py-3 text-cream outline-none focus:border-cream/40 ${
              fieldErrors.message ? "border-[#f2b8b3]" : "border-white/10"
            }`}
          />
          {fieldErrors.message ? (
            <p id="message-error" className="text-sm text-[#f2b8b3]">
              {fieldErrors.message}
            </p>
          ) : null}
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-4 mr-auto w-fit cursor-pointer rounded-full bg-copper px-5 py-3 text-sm font-semibold text-white transition hover:bg-copper/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sender…" : "Send melding"}
        </button>
      </div>

      {status === "success" ? (
        <p className="mt-4 flex items-start gap-3 rounded-2xl bg-forest px-4 py-3 text-sm text-cream">
          <CircleCheck size={18} className="mt-0.5 shrink-0" />
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
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  onChange?: () => void;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-cream/80">{label}</span>
      <input
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        className={`rounded-2xl border bg-white/5 px-4 py-3 text-cream outline-none focus:border-cream/40 ${
          error ? "border-[#f2b8b3]" : "border-white/10"
        }`}
      />
      {error ? (
        <p id={errorId} className="text-sm text-[#f2b8b3]">
          {error}
        </p>
      ) : null}
    </label>
  );
}
