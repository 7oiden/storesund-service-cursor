"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="mt-6 border-t border-line" aria-hidden />
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
            className="rounded-2xl border border-line bg-field px-4 py-3 outline-none focus:border-forest"
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm">
          <span>Passord</span>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full rounded-2xl border border-line bg-field px-4 py-3 pr-12 outline-none focus:border-forest"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-4 text-ink-soft hover:text-ink"
              aria-label={showPassword ? "Skjul passord" : "Vis passord"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full cursor-pointer rounded-full bg-forest py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logger inn…" : "Logg inn"}
        </button>
      </form>
    </div>
  );
}
