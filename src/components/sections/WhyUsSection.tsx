import { useTranslations } from "next-intl";

export default function WhyUsSection() {
  const t = useTranslations("whyus");

  const metrics = [
    {
      val: "97 %",
      label: t("photos_title"),
      desc: t("photos_desc"),
    },
    {
      val: "99 %",
      label: t("marrakech_title"),
      desc: t("marrakech_desc"),
    },
    {
      val: "100 %",
      label: t("clef_title"),
      desc: t("clef_desc"),
    },
    {
      val: "+30",
      label: t("suivi_title"),
      desc: t("suivi_desc"),
    },
  ];

  return (
    <section id="whyus" className="scroll-mt-24 bg-white">
      <div className="py-24 px-6 border-b border-[#E5E0DC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#7A0D0A] text-[11px] font-medium tracking-[0.4em] uppercase mb-6">
              Notre Différence
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-[#1A1714] leading-tight mb-8">
              {t("title")}
            </h2>
            <p className="text-[#6B6560] text-lg leading-relaxed max-w-md">
              {t("subtitle")}
            </p>
          </div>

          <div className="lg:pl-10">
            <blockquote className="relative pl-8 border-l-2 border-[#7A0D0A] mb-10">
              <p className="text-[#1A1714]/75 text-xl font-serif italic leading-relaxed mb-5">
                &ldquo;J&apos;ai confié les clés de mon appartement brut. 4 semaines plus tard, il était en ligne et générait des revenus.&rdquo;
              </p>
              <footer className="text-[#7A0D0A] text-sm font-medium tracking-wide">
                Sarah D. &mdash; Investisseur MRE, Paris
              </footer>
            </blockquote>

            <div className="pt-8 border-t border-[#E5E0DC] grid grid-cols-3 gap-6">
              {[
                { num: "+30", label: "Projets livrés" },
                { num: "84 %", label: "Taux occupation" },
                { num: "4 sem.", label: "Délai moyen" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl text-[#7A0D0A] mb-1 leading-none">{s.num}</p>
                  <p className="text-[#1A1714]/40 text-[10px] tracking-[0.2em] uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#E5E0DC]">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="px-8 py-12 group hover:bg-[#FAF8F5] transition-colors duration-300"
            >
              <p className="font-serif text-5xl text-[#7A0D0A] mb-4 leading-none">{m.val}</p>
              <h3 className="text-[#1A1714] text-xs font-medium uppercase tracking-[0.2em] mb-3">
                {m.label}
              </h3>
              <p className="text-[#6B6560] text-xs leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
