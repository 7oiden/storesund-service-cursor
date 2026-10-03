import { About } from "@/components/home/About";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { OtherServices } from "@/components/home/OtherServices";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyMe } from "@/components/home/WhyMe";
import { getHomeContent, getServiceSummaries, getSiteSettings } from "@/lib/data";

export default async function HomePage() {
  const [settings, content, summaries] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
    getServiceSummaries(),
  ]);

  return (
    <>
      <Hero settings={settings} content={content} />
      <About content={content} />
      <WhyMe items={content.whyMe} />
      <ServicesPreview settings={settings} summaries={summaries} />
      <OtherServices content={content} />
      <CtaBand eyebrow={content.ctaEyebrow} heading={content.ctaHeading} />
    </>
  );
}
