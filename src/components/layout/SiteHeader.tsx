import { getSiteSettings } from "@/lib/data";
import { Header } from "@/components/layout/Header";

export async function SiteHeader() {
  const settings = await getSiteSettings();
  return <Header settings={settings} />;
}
