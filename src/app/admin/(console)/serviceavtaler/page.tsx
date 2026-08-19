import { headers } from "next/headers";
import { updateAgreementStatus } from "@/app/admin/actions";
import { AgreementNoteDialog } from "@/components/admin/AgreementNoteDialog";
import { MarkServicedDialog } from "@/components/admin/MarkServicedDialog";
import { ServiceLogDialog } from "@/components/admin/ServiceLogDialog";
import { getServiceAgreements, type ServiceVisit } from "@/lib/data";
import { cn, formatIsoDate, formatPhone, telHref } from "@/lib/utils";

const statusBadge = {
  active: { label: "Aktiv", className: "bg-forest/20 text-forest" },
  paused: { label: "Pause", className: "bg-amber-300/35 text-amber-900" },
  ended: { label: "Avsluttet", className: "bg-danger/20 text-danger" },
} as const;

const actionBtn =
  "cursor-pointer rounded-full border border-line px-3 py-1.5 text-xs transition hover:border-ink/30 hover:bg-paper";

function dueTone(nextDue: string | null, status: string) {
  if (status !== "active" || !nextDue) return null;
  const [year, month, day] = nextDue.split("-").map(Number);
  const due = new Date(year, month - 1, day);
  const diffDays = (due.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return "Forsinket";
  if (diffDays <= 45) return "Snart";
  return null;
}

function visitsFor(
  visits: ServiceVisit[],
  lastServicedAt: string | null,
): ServiceVisit[] {
  if (visits.length > 0) return visits;
  if (!lastServicedAt) return [];
  return [{ id: "current", serviced_at: lastServicedAt }];
}

async function qrSignupUrl() {
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    "localhost:3000";
  const proto =
    headerList.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}/serviceavtale?fra=qr`;
}

export default async function AdminAgreementsPage() {
  const [agreements, signupUrl] = await Promise.all([
    getServiceAgreements(),
    qrSignupUrl(),
  ]);
  const active = agreements.filter((item) => item.status === "active").length;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(signupUrl)}`;

  return (
    <div>
      <h1 className="display text-4xl">Serviceavtaler</h1>
      <p className="mt-2 text-sm text-ink-soft">
        {active} aktive av {agreements.length} totalt.
      </p>

      <div className="mt-8 flex flex-col gap-6 rounded-3xl border border-line bg-cream p-6 sm:flex-row sm:items-center">
        <img
          src={qrSrc}
          alt="QR-kode til serviceavtale"
          width={180}
          height={180}
          className="size-40 shrink-0 rounded-2xl bg-field p-2"
        />
        <div>
          <h2 className="font-semibold text-ink">QR til kunden</h2>
          <p className="mt-1 max-w-md text-sm leading-6 text-ink-soft">
            Vis denne koden etter jobben, eller lagre bildet på telefonen. Den
            åpner påmeldingssiden med toårsintervall og rabatt.
          </p>
          <p className="mt-3 break-all text-xs text-ink-soft">{signupUrl}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {agreements.length === 0 ? (
          <p className="rounded-3xl border border-line bg-cream p-8 text-sm text-ink-soft">
            Ingen avtaler ennå. Når noen melder seg på via QR-koden, dukker de
            opp her – og du får e-post hvis Resend er satt opp.
          </p>
        ) : (
          agreements.map((item) => {
            const due = dueTone(item.next_due_at, item.status);
            const visits = visitsFor(item.visits, item.last_serviced_at);
            return (
              <article
                key={item.id}
                className="rounded-3xl border border-line bg-cream p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="text-sm text-ink-soft">
                      <a href={telHref(item.phone)} className="hover:text-ink">
                        {formatPhone(item.phone)}
                      </a>
                      {" · "}
                      <a
                        href={`mailto:${item.email}`}
                        className="hover:text-ink"
                      >
                        {item.email}
                      </a>
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{item.address}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {due ? (
                      <span className="rounded-full bg-copper/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-copper">
                        {due}
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                        statusBadge[item.status].className,
                      )}
                    >
                      {statusBadge[item.status].label}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-ink-soft">
                  Sist service {formatIsoDate(item.last_serviced_at)} · Neste{" "}
                  {formatIsoDate(item.next_due_at)}
                </p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <AgreementNoteDialog
                    agreementId={item.id}
                    customerName={item.name}
                    note={item.note}
                  />
                  <div className="flex flex-wrap justify-end gap-2">
                    {item.status !== "ended" ? (
                      <MarkServicedDialog
                        agreementId={item.id}
                        customerName={item.name}
                        visits={visits}
                      />
                    ) : null}
                    <ServiceLogDialog
                      customerName={item.name}
                      visits={visits}
                    />
                    <form className="flex flex-wrap gap-2">
                      {item.status === "active" ? (
                        <button
                          formAction={updateAgreementStatus.bind(
                            null,
                            item.id,
                            "paused",
                          )}
                          className={actionBtn}
                        >
                          Sett på pause
                        </button>
                      ) : null}
                      {item.status === "paused" ? (
                        <button
                          formAction={updateAgreementStatus.bind(
                            null,
                            item.id,
                            "active",
                          )}
                          className={actionBtn}
                        >
                          Aktiver
                        </button>
                      ) : null}
                      {item.status !== "ended" ? (
                        <button
                          formAction={updateAgreementStatus.bind(
                            null,
                            item.id,
                            "ended",
                          )}
                          className={actionBtn}
                        >
                          Avslutt
                        </button>
                      ) : (
                        <button
                          formAction={updateAgreementStatus.bind(
                            null,
                            item.id,
                            "active",
                          )}
                          className={actionBtn}
                        >
                          Gjenåpne
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
