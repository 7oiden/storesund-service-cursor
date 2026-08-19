"use client";

import { useRef } from "react";
import { signOut } from "@/app/admin/actions";
import { DialogCloseButton } from "@/components/admin/DialogCloseButton";

export function LogoutButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="cursor-pointer font-medium tracking-wide text-ink-soft transition hover:text-ink"
      >
        Logg ut
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="logout-title"
        className="fixed left-1/2 top-1/2 w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-line bg-cream p-6 text-ink shadow-lg backdrop:bg-ink/50"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="logout-title" className="display text-2xl">
            Logg ut?
          </h2>
          <DialogCloseButton onClose={close} />
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Du må logge inn igjen for å se henvendelser, FAQ og innstillinger.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm transition hover:border-ink/30 hover:bg-paper"
          >
            Avbryt
          </button>
          <form action={signOut}>
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream transition hover:bg-forest-deep"
            >
              Logg ut
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
