"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  SERVICE_INTERVAL_YEARS,
  addYearsIso,
  isoDate,
  parseIsoDate,
} from "@/lib/utils";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

type SettingsState = {
  error: string;
  success: boolean;
  savedAt: number;
};

export async function updateSettings(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const supabase = await requireUser();
  const { error } = await supabase
    .from("site_settings")
    .update({
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      address: String(formData.get("address") ?? ""),
      org_nr: String(formData.get("org_nr") ?? ""),
      availability_note: String(formData.get("availability_note") ?? ""),
      install_price: Number(formData.get("install_price") ?? 0),
      service_price: Number(formData.get("service_price") ?? 0),
      service_discount_percent: Number(
        formData.get("service_discount_percent") ?? 0,
      ),
    })
    .not("id", "is", null);

  if (error) return { error: error.message, success: false, savedAt: 0 };
  revalidatePath("/", "layout");
  revalidatePath("/admin/innstillinger");
  return { error: "", success: true, savedAt: Date.now() };
}

export async function updateAvailability(isAvailable: boolean) {
  const supabase = await requireUser();
  const { error } = await supabase
    .from("site_settings")
    .update({ is_available: isAvailable })
    .not("id", "is", null);

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath("/admin/innstillinger");
  return { error: "" };
}

export async function updateSubmissionStatus(id: string, status: string) {
  const supabase = await requireUser();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

type DeleteSubmissionState = {
  error: string;
  success: boolean;
};

export async function deleteSubmission(
  _prev: DeleteSubmissionState,
  formData: FormData,
): Promise<DeleteSubmissionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Mangler henvendelse.", success: false };

  const supabase = await requireUser();
  const { data, error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) return { error: error.message, success: false };
  if (!data?.length) {
    return {
      error:
        "Kunne ikke slette. Kjør SQL for slette-tilgang på contact_submissions og prøv igjen.",
      success: false,
    };
  }

  revalidatePath("/admin");
  return { error: "", success: true };
}

type FaqClient = Awaited<ReturnType<typeof createClient>>;

async function listFaqIds(supabase: FaqClient) {
  const { data, error } = await supabase
    .from("faq_items")
    .select("id")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map((item) => item.id as string);
}

async function writeFaqOrder(supabase: FaqClient, ids: string[]) {
  const results = await Promise.all(
    ids.map((id, index) =>
      supabase.from("faq_items").update({ sort_order: index + 1 }).eq("id", id),
    ),
  );
  const failed = results.find((result) => result.error);
  if (failed?.error) throw new Error(failed.error.message);
}

export async function saveFaq(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  const payload = {
    question: String(formData.get("question") ?? ""),
    answer: String(formData.get("answer") ?? ""),
    published: formData.get("published") === "on",
  };

  if (id) {
    const { error } = await supabase
      .from("faq_items")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const ids = await listFaqIds(supabase);
    const { error } = await supabase.from("faq_items").insert({
      ...payload,
      sort_order: ids.length + 1,
    });
    if (error) throw new Error(error.message);
  }

  await writeFaqOrder(supabase, await listFaqIds(supabase));
  revalidatePath("/kontakt");
  revalidatePath("/admin/faq");
}

export async function deleteFaq(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Mangler FAQ-id.");

  const supabase = await requireUser();
  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await writeFaqOrder(supabase, await listFaqIds(supabase));
  revalidatePath("/kontakt");
  revalidatePath("/admin/faq");
}

export async function moveFaq(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || (direction !== "up" && direction !== "down")) return;

  const supabase = await requireUser();
  const ids = await listFaqIds(supabase);
  const index = ids.indexOf(id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= ids.length) return;

  [ids[index], ids[swapWith]] = [ids[swapWith], ids[index]];
  await writeFaqOrder(supabase, ids);
  revalidatePath("/kontakt");
  revalidatePath("/admin/faq");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

type PasswordState = {
  error: string;
  success: boolean;
};

export async function updatePassword(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const supabase = await requireUser();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: "Kunne ikke bekrefte innloggingen.", success: false };
  }

  const currentPassword = String(formData.get("current_password") ?? "");
  const newPassword = String(formData.get("new_password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (newPassword.length < 8) {
    return {
      error: "Det nye passordet må ha minst 8 tegn.",
      success: false,
    };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passordene er ikke like.", success: false };
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    return { error: "Feil nåværende passord.", success: false };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    return {
      error: "Kunne ikke oppdatere passordet. Prøv igjen.",
      success: false,
    };
  }

  return { error: "", success: true };
}

type MarkServicedState = {
  error: string;
  success: boolean;
};

export async function markAgreementServiced(
  _prev: MarkServicedState,
  formData: FormData,
): Promise<MarkServicedState> {
  const id = String(formData.get("id") ?? "");
  const servicedAt = String(formData.get("serviced_at") ?? "");
  const parsed = parseIsoDate(servicedAt);

  if (!id) return { error: "Mangler avtale-id.", success: false };
  if (!parsed) return { error: "Velg en gyldig dato.", success: false };
  if (servicedAt > isoDate()) {
    return { error: "Datoen kan ikke være i fremtiden.", success: false };
  }

  const supabase = await requireUser();
  const nextDue = addYearsIso(parsed, SERVICE_INTERVAL_YEARS);

  const { error: visitError } = await supabase.from("service_visits").insert({
    agreement_id: id,
    serviced_at: servicedAt,
  });
  if (visitError) {
    return {
      error:
        "Kunne ikke lagre serviceloggen. Kjør SQL for tabellen service_visits og prøv igjen.",
      success: false,
    };
  }

  const { data, error } = await supabase
    .from("service_agreements")
    .update({
      last_serviced_at: servicedAt,
      next_due_at: nextDue,
      status: "active",
    })
    .eq("id", id)
    .select("id");

  if (error) return { error: error.message, success: false };
  if (!data?.length) return { error: "Fant ikke avtalen.", success: false };

  revalidatePath("/admin/serviceavtaler");
  return { error: "", success: true };
}

export async function updateAgreementStatus(
  id: string,
  status: "active" | "paused" | "ended",
) {
  const supabase = await requireUser();
  const { error } = await supabase
    .from("service_agreements")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/serviceavtaler");
}

type NoteState = {
  error: string;
  success: boolean;
};

export async function updateAgreementNote(
  _prev: NoteState,
  formData: FormData,
): Promise<NoteState> {
  const id = String(formData.get("id") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  if (!id) return { error: "Mangler avtale-id.", success: false };
  if (note.length > 1000) {
    return { error: "Merknaden kan være på maks 1000 tegn.", success: false };
  }

  const supabase = await requireUser();
  const { data, error } = await supabase
    .from("service_agreements")
    .update({ note })
    .eq("id", id)
    .select("id");

  if (error) return { error: error.message, success: false };
  if (!data?.length) return { error: "Fant ikke avtalen.", success: false };

  revalidatePath("/admin/serviceavtaler");
  return { error: "", success: true };
}
