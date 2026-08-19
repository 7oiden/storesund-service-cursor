"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CircleCheck } from "lucide-react";
import { updatePassword } from "@/app/admin/actions";
import { DialogCloseButton } from "@/components/admin/DialogCloseButton";
import { PasswordField } from "@/components/admin/PasswordField";

const initialState = { error: "", success: false };

export function PasswordForm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 cursor-pointer rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep"
      >
        Bytt passord
      </button>
      {open ? <PasswordModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function PasswordModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [state, action, pending] = useActionState(updatePassword, initialState);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const onCancel = (event: Event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, []);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-[min(100%-2rem,32rem)] max-h-[90vh] overflow-auto rounded-3xl border border-line bg-cream p-6 text-ink shadow-lg backdrop:bg-ink/45"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="display text-2xl">Bytt passord</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Bytt passordet du bruker for å logge inn i admin.
          </p>
        </div>
        <DialogCloseButton onClose={onClose} />
      </div>

      <form ref={formRef} action={action} className="mt-5 grid gap-4">
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
          <p className="rounded-2xl bg-danger/20 px-4 py-3 text-sm">
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p className="flex items-start gap-3 rounded-2xl bg-forest px-4 py-3 text-sm text-cream">
            <CircleCheck size={18} className="mt-0.5 shrink-0" />
            Passordet er oppdatert.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {state.success ? (
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-deep"
            >
              Lukk
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={pending}
                className="cursor-pointer rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Lagrer…" : "Lagre passord"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-ink/30 hover:bg-paper"
              >
                Avbryt
              </button>
            </>
          )}
        </div>
      </form>
    </dialog>
  );
}
