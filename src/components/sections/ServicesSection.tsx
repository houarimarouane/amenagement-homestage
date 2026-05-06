import { useTranslations } from "next-intl";
import ServiceCard from "@/components/ui/ServiceCard";

export default function ServicesSection() {
  const t = useTranslations("services");

  const services = [
    {
      icon: "🛋️",
      title: t("decoration_title"),
      description: t("decoration_desc"),
    },
    {
      icon: "🔨",
      title: t("renovation_title"),
      description: t("renovation_desc"),
    },
    {
      icon: "🏠",
      title: t("airbnb_title"),
      description: t("airbnb_desc"),
    },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C9A96E] text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
