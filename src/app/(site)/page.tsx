import { About } from "@/components/home/About";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { OtherServices } from "@/components/home/OtherServices";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyMe } from "@/components/home/WhyMe";
import { getSiteSettings } from "@/lib/data";

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero settings={settings} />
      <About />
      <WhyMe />
      <ServicesPreview settings={settings} />
      <OtherServices />
      <CtaBand />
    </>
  );
}
