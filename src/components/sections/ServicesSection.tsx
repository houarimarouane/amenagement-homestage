import { useTranslations } from "next-intl";

const SERVICE_ICONS = [
  /* Aménagement & Décoration : canapé */
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
    <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
    <path d="M4 18v2" />
    <path d="M20 18v2" />
    <path d="M12 4v9" />
  </svg>,
  /* Rénovation Complète : clé/outil */
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
  </svg>,
  /* Airbnb Clé-en-Main : maison */
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M9 21V12h6v9" />
  </svg>,
];

export default function ServicesSection() {
  const t = useTranslations("services");

  const services = [
    {
      num: "01",
      title: t("decoration_title"),
      description: t("decoration_desc"),
    },
    {
      num: "02",
      title: t("renovation_title"),
      description: t("renovation_desc"),
    },
    {
      num: "03",
      title: t("airbnb_title"),
      description: t("airbnb_desc"),
    },
  ];

  return (
    <section id="services" className="py-28 px-6 bg-[#FBF6F1]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-20">
          <div>
            <p className="text-[#7A0D0A] text-[11px] font-medium tracking-[0.4em] uppercase mb-5">
              Nos Services
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground leading-tight">
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-[#6B6560] text-lg leading-relaxed">{t("subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E5E0DC]">
          {services.map((service, i) => {
            const isFeatured = i === 2;
            return (
              <div
                key={service.num}
                className={`relative p-10 lg:p-12 group transition-all duration-500 cursor-default ${
                  isFeatured
                    ? "bg-[#7A0D0A] hover:bg-[#6A0B08] md:-mt-6 md:-mb-0 md:shadow-2xl z-10"
                    : "hover:bg-white border-b md:border-b-0 md:border-r border-[#E5E0DC]"
                } ${i === 1 ? "md:border-r border-[#E5E0DC]" : ""}`}
              >
                {isFeatured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-foreground text-white text-[10px] font-medium tracking-[0.3em] uppercase px-4 py-1.5 whitespace-nowrap">
                      ★ Offre phare
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-8">
                  <span className={`font-heading text-5xl md:text-6xl leading-none select-none transition-colors ${
                    isFeatured
                      ? "text-white/20 group-hover:text-white/30"
                      : "text-[#E8E4E0] group-hover:text-[#F0EBE8]"
                  }`}>
                    {service.num}
                  </span>
                  <div className={`[&>svg]:w-9 [&>svg]:h-9 transition-opacity duration-300 ${
                    isFeatured
                      ? "text-white opacity-80 group-hover:opacity-100"
                      : "text-[#7A0D0A] opacity-60 group-hover:opacity-100"
                  }`}>
                    {SERVICE_ICONS[i]}
                  </div>
                </div>

                <div className={`w-8 h-px mb-6 ${isFeatured ? "bg-white/40" : "bg-[#7A0D0A]"}`} />

                <h3 className={`font-heading text-xl mb-4 transition-colors leading-snug ${
                  isFeatured ? "text-white" : "text-foreground"
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors mb-8 ${
                  isFeatured ? "text-white/70" : "text-[#6B6560]"
                }`}>
                  {service.description}
                </p>

                <div className={`flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase ${
                  isFeatured ? "text-white" : "text-[#7A0D0A]"
                }`}>
                  <span>En savoir plus</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
