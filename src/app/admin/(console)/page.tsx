import Link from "next/link";
import { updateSubmissionStatus } from "@/app/admin/actions";
import { getSubmissionsPage } from "@/lib/data";
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

function parsePage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function AdminInboxPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const params = await searchParams;
  const { items, total, unread, page, pageCount } = await getSubmissionsPage(
    parsePage(params.page),
  );

  return (
    <div>
      <h1 className="display text-4xl">Henvendelser</h1>
      <p className="mt-2 text-sm text-ink-soft">
        {unread} nye av {total} totalt.
      </p>
      <div className="mt-8 space-y-4">
        {total === 0 ? (
          <p className="rounded-3xl border border-line bg-cream p-8 text-sm text-ink-soft">
            Ingen henvendelser ennå. Når noen sender skjemaet, dukker de opp
            her – og du får e-post hvis Resend er satt opp.
          </p>
        ) : (
          items.map((item) => (
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
      <Pagination page={page} pageCount={pageCount} total={total} />
    </div>
  );
}

const pagerLink =
  "inline-flex cursor-pointer rounded-full border border-line px-4 py-2 text-sm transition hover:border-ink/30 hover:bg-cream";
const pagerDisabled =
  "inline-flex rounded-full border border-line px-4 py-2 text-sm opacity-40";

function Pagination({
  page,
  pageCount,
  total,
}: {
  page: number;
  pageCount: number;
  total: number;
}) {
  if (total === 0 || pageCount <= 1) return null;

  const prevHref = page <= 2 ? "/admin" : `/admin?page=${page - 1}`;
  const nextHref = `/admin?page=${page + 1}`;

  return (
    <nav
      className="mt-8 flex items-center justify-between gap-4 text-sm"
      aria-label="Sider"
    >
      {page > 1 ? (
        <Link href={prevHref} className={pagerLink}>
          Forrige
        </Link>
      ) : (
        <span className={pagerDisabled}>Forrige</span>
      )}
      <p className="text-ink-soft">
        Side {page} av {pageCount}
      </p>
      {page < pageCount ? (
        <Link href={nextHref} className={pagerLink}>
          Neste
        </Link>
      ) : (
        <span className={pagerDisabled}>Neste</span>
      )}
    </nav>
  );
}
