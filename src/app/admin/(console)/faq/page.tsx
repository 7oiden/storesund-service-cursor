import { ChevronDown, ChevronUp } from "lucide-react";
import { deleteFaq, moveFaq, saveFaq } from "@/app/admin/actions";
import { Toggle } from "@/components/admin/Toggle";
import { getFaqs } from "@/lib/data";

const iconBtn =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-ink/30 hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-ink-soft";

export default async function AdminFaqPage() {
  const faqs = await getFaqs(true);

  return (
    <div>
      <h1 className="display text-4xl">FAQ</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Disse vises på kontaktsiden når de er publisert. Bruk pilene for å
        endre rekkefølgen.
      </p>

      <form
        action={saveFaq}
        className="mt-8 grid gap-3 rounded-3xl border border-line bg-cream p-6"
      >
        <h2 className="font-semibold">Nytt spørsmål</h2>
        <input
          name="question"
          required
          placeholder="Spørsmål"
          className="rounded-2xl border border-line bg-field px-4 py-3 text-sm"
        />
        <textarea
          name="answer"
          required
          rows={4}
          placeholder="Svar"
          className="rounded-2xl border border-line bg-field px-4 py-3 text-sm"
        />
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Toggle name="published" label="Publisert" defaultChecked />
          <button className="cursor-pointer rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream transition hover:bg-forest-deep">
            Lagre
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="flex items-start gap-2">
            <div className="flex flex-col gap-1 pt-6">
              <form action={moveFaq}>
                <input type="hidden" name="id" value={faq.id} />
                <input type="hidden" name="direction" value="up" />
                <button
                  type="submit"
                  disabled={index === 0}
                  aria-label="Flytt opp"
                  className={iconBtn}
                >
                  <ChevronUp size={16} />
                </button>
              </form>
              <form action={moveFaq}>
                <input type="hidden" name="id" value={faq.id} />
                <input type="hidden" name="direction" value="down" />
                <button
                  type="submit"
                  disabled={index === faqs.length - 1}
                  aria-label="Flytt ned"
                  className={iconBtn}
                >
                  <ChevronDown size={16} />
                </button>
              </form>
            </div>
            <form
              action={saveFaq}
              className="grid min-w-0 flex-1 gap-3 rounded-3xl border border-line bg-cream p-6"
            >
              <input type="hidden" name="id" value={faq.id} />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                Spørsmål {index + 1}
              </p>
              <input
                name="question"
                defaultValue={faq.question}
                className="rounded-2xl border border-line bg-field px-4 py-3 text-sm"
              />
              <textarea
                name="answer"
                defaultValue={faq.answer}
                rows={4}
                className="rounded-2xl border border-line bg-field px-4 py-3 text-sm"
              />
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Toggle
                  name="published"
                  label="Publisert"
                  defaultChecked={faq.published !== false}
                />
                <button className="cursor-pointer rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream transition hover:bg-forest-deep">
                  Oppdater
                </button>
                <button
                  formAction={deleteFaq}
                  className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm transition hover:border-ink/30 hover:bg-paper"
                >
                  Slett
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
