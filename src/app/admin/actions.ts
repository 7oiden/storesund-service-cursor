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

export async function updateSettings(formData: FormData) {
  const supabase = await requireUser();
  const { error } = await supabase
    .from("site_settings")
    .update({
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      address: String(formData.get("address") ?? ""),
      org_nr: String(formData.get("org_nr") ?? ""),
      is_available: formData.get("is_available") === "on",
      availability_note: String(formData.get("availability_note") ?? ""),
      install_price: Number(formData.get("install_price") ?? 0),
      service_price: Number(formData.get("service_price") ?? 0),
      service_discount_percent: Number(
        formData.get("service_discount_percent") ?? 0,
      ),
    })
    .not("id", "is", null);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/admin/innstillinger");
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

export async function saveFaq(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  const payload = {
    question: String(formData.get("question") ?? ""),
    answer: String(formData.get("answer") ?? ""),
    sort_order: Number(formData.get("sort_order") ?? 0),
    published: formData.get("published") === "on",
  };

  const { error } = id
    ? await supabase.from("faq_items").update(payload).eq("id", id)
    : await supabase.from("faq_items").insert(payload);

  if (error) throw new Error(error.message);
  revalidatePath("/kontakt");
  revalidatePath("/admin/faq");
}

export async function deleteFaq(id: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
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
