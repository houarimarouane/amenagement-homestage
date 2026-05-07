import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AirbnbSection from "@/components/sections/AirbnbSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import ContactSection from "@/components/sections/ContactSection";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <ServicesSection />
      <AirbnbSection />
      <ProjectsPreview locale={locale} />
      <WhyUsSection />
      <ContactSection />
    </>
  );
}
