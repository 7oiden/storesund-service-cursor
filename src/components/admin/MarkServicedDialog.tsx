"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { markAgreementServiced } from "@/app/admin/actions";
import type { ServiceVisit } from "@/lib/data";
import {
  SERVICE_INTERVAL_YEARS,
  addYearsIso,
  formatIsoDate,
  isoDate,
  parseIsoDate,
} from "@/lib/utils";

const initialState = { error: "", success: false };

const actionBtn =
  "cursor-pointer rounded-full border border-line px-3 py-1.5 text-xs transition hover:border-ink/30 hover:bg-paper";

export function MarkServicedDialog({
  agreementId,
  customerName,
  visits,
}: {
  agreementId: string;
  customerName: string;
  visits: ServiceVisit[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={actionBtn} onClick={() => setOpen(true)}>
        Merk som utført
      </button>
      {open ? (
        <MarkServicedModal
          agreementId={agreementId}
          customerName={customerName}
          visits={visits}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function MarkServicedModal({
  agreementId,
  customerName,
  visits,
  onClose,
}: {
  agreementId: string;
  customerName: string;
  visits: ServiceVisit[];
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [servicedAt, setServicedAt] = useState(isoDate());
  const [state, action, pending] = useActionState(
    markAgreementServiced,
    initialState,
  );

  const parsed = parseIsoDate(servicedAt);
  const nextDue = parsed ? addYearsIso(parsed, SERVICE_INTERVAL_YEARS) : null;

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
      <h2 className="display text-2xl">Merk som utført</h2>
      <p className="mt-1 text-sm text-ink-soft">{customerName}</p>

      {visits.length > 0 ? (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Tidligere servicer
          </p>
          <ul className="mt-2 space-y-1 text-sm text-ink">
            {visits.map((visit) => (
              <li key={visit.id}>{formatIsoDate(visit.serviced_at)}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <form action={action} className="mt-5 grid gap-4">
        <input type="hidden" name="id" value={agreementId} />
        <label className="grid gap-2 text-sm">
          Dato for utført service
          <input
            type="date"
            name="serviced_at"
            required
            value={servicedAt}
            max={isoDate()}
            onChange={(event) => setServicedAt(event.target.value)}
            className="rounded-2xl border border-line bg-field px-4 py-3 text-sm"
          />
        </label>
        <p className="text-sm text-ink-soft">
          Neste service blir {formatIsoDate(nextDue)} ({SERVICE_INTERVAL_YEARS}{" "}
          år etter valgt dato).
        </p>
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
