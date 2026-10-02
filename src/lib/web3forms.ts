const ENDPOINT = "https://api.web3forms.com/submit";

/** Public by design: Web3Forms access keys are meant to ship in the browser. */
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export async function submitToWeb3Forms(
  subject: string,
  fields: Record<string, string>,
  honeypot: boolean,
): Promise<{ ok: boolean; error?: string }> {
  if (!accessKey) return { ok: false, error: "Skjemaet er ikke konfigurert ennå." };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "Storesund Service",
        botcheck: honeypot,
        ...fields,
      }),
    });
    const data = (await response.json()) as { success?: boolean; message?: string };
    return data.success
      ? { ok: true }
      : { ok: false, error: "Noe gikk galt. Prøv igjen senere." };
  } catch {
    return { ok: false, error: "Noe gikk galt. Prøv igjen senere." };
  }
}
