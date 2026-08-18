export type SiteSettings = {
  id?: string;
  phone: string;
  email: string;
  address: string;
  org_nr: string;
  is_available: boolean;
  availability_note: string;
  install_price: number;
  service_price: number;
  service_discount_percent: number;
};

export const defaultSettings: SiteSettings = {
  phone: "90659303",
  email: "hugo.storesund@gmail.com",
  address: "Lyngvegen 4a, 5382 Skogsvåg",
  org_nr: "977314194",
  is_available: true,
  availability_note:
    "Jobber 14 dager om gangen i Nordsjøen. E-post og kontaktskjemaet når meg alltid.",
  install_price: 3750,
  service_price: 1300,
  service_discount_percent: 10,
};

export const photos = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
  about: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
  install: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  service: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
  repair: "https://images.unsplash.com/photo-1504148453398-acc1539d3f61?auto=format&fit=crop&w=1400&q=80",
  work1: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  work2: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=900&q=80",
  work3: "https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?auto=format&fit=crop&w=900&q=80",
  work4: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
} as const;
