import { createClient } from "@/lib/supabase/server";
import { fallbackFaqs } from "@/lib/content";
import { defaultSettings, type SiteSettings } from "@/lib/site";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sort_order?: number;
  published?: boolean;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) return defaultSettings;
    return { ...defaultSettings, ...data };
  } catch {
    return defaultSettings;
  }
}

export async function getFaqs(includeUnpublished = false): Promise<FaqItem[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("faq_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;
    if (error || !data?.length) return fallbackFaqs;
    return data;
  } catch {
    return fallbackFaqs;
  }
}

export async function getSubmissions(): Promise<ContactSubmission[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as ContactSubmission[];
}
