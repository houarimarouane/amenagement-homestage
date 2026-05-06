import { useTranslations } from "next-intl";

export default function WhyUsSection() {
  const t = useTranslations("whyus");

  const items = [
    { icon: "📸", title: t("photos_title"), desc: t("photos_desc") },
    { icon: "📍", title: t("marrakech_title"), desc: t("marrakech_desc") },
    { icon: "🔑", title: t("clef_title"), desc: t("clef_desc") },
    { icon: "💬", title: t("suivi_title"), desc: t("suivi_desc") },
  ];

  return (
    <section className="py-24 px-6 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C9A96E] text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Notre Différence
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">{t("title")}</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.title} className="text-center group">
              <div className="text-5xl mb-5">{item.icon}</div>
              <h3 className="font-serif text-xl text-[#C9A96E] mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
