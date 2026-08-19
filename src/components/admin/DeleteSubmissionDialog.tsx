"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteSubmission } from "@/app/admin/actions";

const initialState = { error: "", success: false };

export function DeleteSubmissionDialog({
  submissionId,
  customerName,
}: {
  submissionId: string;
  customerName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Slett henvendelse"
        title="Slett henvendelse"
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-danger/40 hover:bg-danger/10 hover:text-danger"
      >
        <Trash2 size={16} />
      </button>
      {open ? (
        <ConfirmDeleteModal
          submissionId={submissionId}
          customerName={customerName}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function ConfirmDeleteModal({
  submissionId,
  customerName,
  onClose,
}: {
  submissionId: string;
  customerName: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [state, action, pending] = useActionState(
    deleteSubmission,
    initialState,
  );

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
    if (state.success) onCloseRef.current();
  }, [state.success]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-[min(100%-2rem,28rem)] max-h-[90vh] overflow-auto rounded-3xl border border-line bg-cream p-6 text-ink shadow-lg backdrop:bg-ink/45"
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <h2 className="display text-2xl">Slett henvendelse</h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        Vil du slette henvendelsen fra {customerName}? Dette kan ikke angres.
      </p>
      <form action={action} className="mt-5 grid gap-4">
        <input type="hidden" name="id" value={submissionId} />
        {state.error ? (
          <p className="rounded-2xl bg-danger/20 px-4 py-3 text-sm">
            {state.error}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-full bg-danger px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-danger/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Sletter…" : "Slett"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-ink/30 hover:bg-paper"
          >
            Avbryt
          </button>
        </div>
      </form>
    </dialog>
  );
}
