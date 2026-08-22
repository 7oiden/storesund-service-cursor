"use client";

import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import {
  agreementSchema,
  fieldErrorsFromZod,
  type FieldErrors,
} from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

const SUCCESS_TIMEOUT_MS = 8000;

export function AgreementForm({ source = "qr" }: { source?: "qr" | "web" }) {
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
    const parsed = agreementSchema.safeParse(payload);

    if (!parsed.success) {
      setFieldErrors(fieldErrorsFromZod(parsed.error));
      setStatus("idle");
      return;
    }

    setFieldErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/serviceavtale", {
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
      className="rounded-3xl bg-cream p-6 text-ink sm:p-8"
    >
      <h2 className="display text-3xl">Meld deg på</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Du betaler etter hver service, med rabatt på de neste.
      </p>

      <input type="hidden" name="source" value={source} />

      <div className="mt-6 grid gap-4">
        <Field
          label="Navn"
          name="name"
          error={fieldErrors.name}
          onChange={() => clearField("name")}
        />
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          error={fieldErrors.phone}
          onChange={() => clearField("phone")}
        />
        <Field
          label="E-post"
          name="email"
          type="email"
          error={fieldErrors.email}
          onChange={() => clearField("email")}
        />
        <Field
          label="Adresse"
          name="address"
          error={fieldErrors.address}
          onChange={() => clearField("address")}
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
            aria-invalid={Boolean(fieldErrors.note)}
            aria-describedby={fieldErrors.note ? "note-error" : undefined}
            onChange={() => clearField("note")}
            className={`rounded-2xl border bg-field px-4 py-3.5 text-base outline-none focus:border-forest ${
              fieldErrors.note ? "border-danger" : "border-line"
            }`}
          />
          {fieldErrors.note ? (
            <p id="note-error" className="text-sm text-danger">
              {fieldErrors.note}
            </p>
          ) : null}
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 mr-auto w-fit cursor-pointer rounded-full bg-copper px-6 py-3.5 text-base font-semibold text-white transition hover:bg-copper/90 disabled:cursor-not-allowed disabled:opacity-60"
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
      <span className="font-medium">{label}</span>
      <input
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        className={`rounded-2xl border bg-field px-4 py-3.5 text-base outline-none focus:border-forest ${
          error ? "border-danger" : "border-line"
        }`}
      />
      {error ? (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </label>
  );
}
