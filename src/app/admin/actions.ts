"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
