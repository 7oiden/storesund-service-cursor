"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleCheck } from "lucide-react";
import { updatePassword } from "@/app/admin/actions";
import { PasswordField } from "@/components/admin/PasswordField";

const initialState = { error: "", success: false };

export function PasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(updatePassword, initialState);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={action} className="grid gap-4">
      <PasswordField
        name="current_password"
        label="Nåværende passord"
        autoComplete="current-password"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <PasswordField
          name="new_password"
          label="Nytt passord"
          autoComplete="new-password"
          minLength={8}
        />
        <PasswordField
          name="confirm_password"
          label="Bekreft nytt passord"
          autoComplete="new-password"
          minLength={8}
        />
      </div>
      {state.error ? (
        <p className="rounded-2xl bg-danger/20 px-4 py-3 text-sm">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="flex items-start gap-3 rounded-2xl bg-forest px-4 py-3 text-sm text-cream">
          <CircleCheck size={18} className="mt-0.5 shrink-0" />
          Passordet er oppdatert.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit cursor-pointer rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Lagrer…" : "Lagre passord"}
      </button>
    </form>
  );
}
