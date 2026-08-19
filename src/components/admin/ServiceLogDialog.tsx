"use client";

import { useEffect, useRef, useState } from "react";
import { DialogCloseButton } from "@/components/admin/DialogCloseButton";
import type { ServiceVisit } from "@/lib/data";
import { formatIsoDate } from "@/lib/utils";

const actionBtn =
  "cursor-pointer rounded-full border border-line px-3 py-1.5 text-xs transition hover:border-ink/30 hover:bg-paper";

export function ServiceLogDialog({
  customerName,
  visits,
}: {
  customerName: string;
  visits: ServiceVisit[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={actionBtn} onClick={() => setOpen(true)}>
        Servicelogg
      </button>
      {open ? (
        <ServiceLogModal
          customerName={customerName}
          visits={visits}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function ServiceLogModal({
  customerName,
  visits,
  onClose,
}: {
  customerName: string;
  visits: ServiceVisit[];
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

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

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-[min(100%-2rem,28rem)] max-h-[90vh] overflow-auto rounded-3xl border border-line bg-cream p-6 text-ink shadow-lg backdrop:bg-ink/45"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="display text-2xl">Servicelogg</h2>
          <p className="mt-1 text-sm text-ink-soft">{customerName}</p>
        </div>
        <DialogCloseButton onClose={onClose} />
      </div>

      {visits.length === 0 ? (
        <p className="mt-5 text-sm text-ink-soft">Ingen servicer logget ennå.</p>
      ) : (
        <ol className="mt-5 space-y-2">
          {visits.map((visit, index) => (
            <li
              key={visit.id}
              className="flex items-baseline justify-between gap-3 rounded-2xl bg-field px-4 py-3 text-sm"
            >
              <span className="text-ink">{formatIsoDate(visit.serviced_at)}</span>
              {index === 0 ? (
                <span className="text-xs font-semibold uppercase tracking-wide text-forest">
                  Sist
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      )}

      <button
        type="button"
        onClick={onClose}
        className="mt-5 cursor-pointer rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-ink/30 hover:bg-paper"
      >
        Lukk
      </button>
    </dialog>
  );
}
