"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { StickyNote } from "lucide-react";
import { updateAgreementNote } from "@/app/admin/actions";
import { DialogCloseButton } from "@/components/admin/DialogCloseButton";
import { cn } from "@/lib/utils";

const initialState = { error: "", success: false };

export function AgreementNoteDialog({
  agreementId,
  customerName,
  note,
}: {
  agreementId: string;
  customerName: string;
  note: string;
}) {
  const [open, setOpen] = useState(false);
  const hasNote = note.trim().length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={hasNote ? "Åpne merknad" : "Legg til merknad"}
        title={hasNote ? "Merknad" : "Legg til merknad"}
        className={cn(
          "inline-flex size-9 cursor-pointer items-center justify-center rounded-full border transition",
          hasNote
            ? "border-forest/30 bg-forest/10 text-forest hover:border-forest/50 hover:bg-forest/15"
            : "border-line text-ink-soft hover:border-ink/30 hover:bg-paper hover:text-ink",
        )}
      >
        <StickyNote size={16} />
      </button>
      {open ? (
        <NoteModal
          agreementId={agreementId}
          customerName={customerName}
          note={note}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function NoteModal({
  agreementId,
  customerName,
  note,
  onClose,
}: {
  agreementId: string;
  customerName: string;
  note: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [state, action, pending] = useActionState(
    updateAgreementNote,
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
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="display text-2xl">Merknad</h2>
          <p className="mt-1 text-sm text-ink-soft">{customerName}</p>
        </div>
        <DialogCloseButton onClose={onClose} />
      </div>

      <form action={action} className="mt-5 grid gap-4">
        <input type="hidden" name="id" value={agreementId} />
        <label className="grid gap-2 text-sm">
          Notat til avtalen
          <textarea
            name="note"
            rows={6}
            maxLength={1000}
            defaultValue={note}
            placeholder="F.eks. merke på pumpen, atkomst eller annet du vil huske til neste gang."
            className="rounded-2xl border border-line bg-field px-4 py-3 text-sm outline-none focus:border-forest"
          />
        </label>
        {state.error ? (
          <p className="rounded-2xl bg-danger/20 px-4 py-3 text-sm">
            {state.error}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Lagrer…" : "Lagre"}
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
