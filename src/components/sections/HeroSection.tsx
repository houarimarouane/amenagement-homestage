import { useTranslations } from "next-intl";
import Link from "next/link";

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const prefix = locale === "fr" ? "" : "/en";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-[#C9A96E] font-medium tracking-[0.3em] text-sm uppercase mb-6">
          Marrakech
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-10 tracking-wide">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`${prefix}/projets`}
            className="bg-white text-[#1A1A1A] px-8 py-4 font-medium hover:bg-[#C9A96E] hover:text-white transition-colors"
          >
            {t("cta_projects")}
          </Link>
          <Link
            href="#contact"
            className="border border-white text-white px-8 py-4 font-medium hover:bg-white hover:text-[#1A1A1A] transition-colors"
          >
            {t("cta_contact")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/30" />
      </div>
    </section>
  );
}
