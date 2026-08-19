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

    const { data, error } = await query.order("id", { ascending: true });
    if (error || !data?.length) return fallbackFaqs;
    return data;
  } catch {
    return fallbackFaqs;
  }
}

export const SUBMISSIONS_PAGE_SIZE = 10;

export type SubmissionsPage = {
  items: ContactSubmission[];
  total: number;
  unread: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

export async function getSubmissionsPage(
  requestedPage = 1,
  pageSize = SUBMISSIONS_PAGE_SIZE,
): Promise<SubmissionsPage> {
  const supabase = await createClient();
  let page = Math.max(1, Math.floor(requestedPage) || 1);

  const unreadQuery = supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  async function fetchPage(pageNumber: number) {
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;
    return supabase
      .from("contact_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);
  }

  const [listResult, unreadResult] = await Promise.all([
    fetchPage(page),
    unreadQuery,
  ]);

  const total = listResult.count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  let items = (listResult.data ?? []) as ContactSubmission[];

  if (total > 0 && page > pageCount) {
    page = pageCount;
    const lastPage = await fetchPage(page);
    items = (lastPage.data ?? []) as ContactSubmission[];
  }

  return {
    items,
    total,
    unread: unreadResult.count ?? 0,
    page,
    pageSize,
    pageCount,
  };
}

export type ServiceVisit = {
  id: string;
  serviced_at: string;
};

export type ServiceAgreement = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  note: string;
  source: string;
  status: "active" | "paused" | "ended";
  last_serviced_at: string | null;
  next_due_at: string | null;
  created_at: string;
  visits: ServiceVisit[];
};

export async function getServiceAgreements(): Promise<ServiceAgreement[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_agreements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  const agreements = data as Omit<ServiceAgreement, "visits">[];
  const visitsByAgreement = new Map<string, ServiceVisit[]>();

  if (agreements.length > 0) {
    const { data: visits } = await supabase
      .from("service_visits")
      .select("id, agreement_id, serviced_at")
      .in(
        "agreement_id",
        agreements.map((item) => item.id),
      )
      .order("serviced_at", { ascending: false });

    for (const visit of visits ?? []) {
      const list = visitsByAgreement.get(visit.agreement_id) ?? [];
      list.push({ id: visit.id, serviced_at: visit.serviced_at });
      visitsByAgreement.set(visit.agreement_id, list);
    }
  }

  const rank = { active: 0, paused: 1, ended: 2 } as const;
  return agreements
    .map((item) => ({
      ...item,
      visits: visitsByAgreement.get(item.id) ?? [],
    }))
    .sort((a, b) => {
      const byStatus = rank[a.status] - rank[b.status];
      if (byStatus !== 0) return byStatus;
      return (a.next_due_at ?? "").localeCompare(b.next_due_at ?? "");
    });
}
