import { updateSubmissionStatus } from "@/app/admin/actions";
import { getSubmissions } from "@/lib/data";
import { cn, formatPhone } from "@/lib/utils";

const statusBadge = {
  new: {
    label: "Ny",
    className: "bg-copper/20 text-copper",
  },
  read: {
    label: "Lest",
    className: "bg-amber-300/35 text-amber-900",
  },
  replied: {
    label: "Besvart",
    className: "bg-forest/20 text-forest",
  },
} as const;

export default async function AdminInboxPage() {
  const submissions = await getSubmissions();
  const unread = submissions.filter((item) => item.status === "new").length;

  return (
    <div>
      <h1 className="display text-4xl">Henvendelser</h1>
      <p className="mt-2 text-sm text-ink-soft">
        {unread} nye av {submissions.length} totalt.
      </p>
      <div className="mt-8 space-y-4">
        {submissions.length === 0 ? (
          <p className="rounded-3xl border border-line bg-cream p-8 text-sm text-ink-soft">
            Ingen henvendelser ennå. Når noen sender skjemaet, dukker de opp
            her – og du får e-post hvis Resend er satt opp.
          </p>
        ) : (
          submissions.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-line bg-cream p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="text-sm text-ink-soft">
                    {item.email} · {formatPhone(item.phone)}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                    statusBadge[item.status].className,
                  )}
                >
                  {statusBadge[item.status].label}
                </span>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-ink">
                {item.message}
              </p>
              <p className="mt-3 text-xs text-ink-soft">
                {new Date(item.created_at).toLocaleString("nb-NO")}
              </p>
              <form className="mt-4 flex gap-2">
                <button
                  formAction={updateSubmissionStatus.bind(null, item.id, "read")}
                  className="cursor-pointer rounded-full border border-line px-3 py-1.5 text-xs transition hover:border-ink/30 hover:bg-paper"
                >
                  Merk som lest
                </button>
                <button
                  formAction={updateSubmissionStatus.bind(
                    null,
                    item.id,
                    "replied",
                  )}
                  className="cursor-pointer rounded-full border border-line px-3 py-1.5 text-xs transition hover:border-ink/30 hover:bg-paper"
                >
                  Merk som besvart
                </button>
              </form>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
