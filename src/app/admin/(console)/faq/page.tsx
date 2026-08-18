import { deleteFaq, saveFaq } from "@/app/admin/actions";
import { Toggle } from "@/components/admin/Toggle";
import { getFaqs } from "@/lib/data";

export default async function AdminFaqPage() {
  const faqs = await getFaqs(true);

  return (
    <div>
      <h1 className="display text-4xl">FAQ</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Disse vises på kontaktsiden når de er publisert.
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
          className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm"
        />
        <textarea
          name="answer"
          required
          rows={4}
          placeholder="Svar"
          className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm"
        />
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            Rekkefølge
            <input
              name="sort_order"
              type="number"
              defaultValue={faqs.length + 1}
              className="w-20 rounded-xl border border-line bg-paper px-3 py-2"
            />
          </label>
          <Toggle name="published" label="Publisert" defaultChecked />
          <button className="cursor-pointer rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream transition hover:bg-forest-deep">
            Lagre
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <form
            key={faq.id}
            action={saveFaq}
            className="grid gap-3 rounded-3xl border border-line bg-cream p-6"
          >
            <input type="hidden" name="id" value={faq.id} />
            <input
              name="question"
              defaultValue={faq.question}
              className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm"
            />
            <textarea
              name="answer"
              defaultValue={faq.answer}
              rows={4}
              className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm"
            />
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                Rekkefølge
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={faq.sort_order ?? 0}
                  className="w-20 rounded-xl border border-line bg-paper px-3 py-2"
                />
              </label>
              <Toggle
                name="published"
                label="Publisert"
                defaultChecked={faq.published !== false}
              />
              <button className="cursor-pointer rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream transition hover:bg-forest-deep">
                Oppdater
              </button>
              <button
                formAction={deleteFaq.bind(null, faq.id)}
                className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm transition hover:border-ink/30 hover:bg-paper"
              >
                Slett
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
