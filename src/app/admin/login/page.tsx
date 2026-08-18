"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });

    if (signInError) {
      setError("Feil e-post eller passord.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-forest-deep px-5 py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl bg-cream p-8"
      >
        <Logo />
        <h1 className="display mt-6 text-3xl text-ink">Admin</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Logg inn for å se henvendelser, FAQ og tilgjengelighet.
        </p>
        <label className="mt-6 grid gap-2 text-sm">
          <span>E-post</span>
          <input
            name="email"
            type="email"
            required
            className="rounded-2xl border border-line bg-paper px-4 py-3 outline-none focus:border-forest"
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm">
          <span>Passord</span>
          <input
            name="password"
            type="password"
            required
            className="rounded-2xl border border-line bg-paper px-4 py-3 outline-none focus:border-forest"
          />
        </label>
        {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-forest py-3 text-sm font-semibold text-cream disabled:opacity-60"
        >
          {loading ? "Logger inn…" : "Logg inn"}
        </button>
      </form>
    </div>
  );
}
