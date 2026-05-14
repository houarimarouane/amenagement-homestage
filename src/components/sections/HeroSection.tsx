import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import HeroForm from "@/components/ui/HeroForm";

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations("hero");
  const prefix = locale === "fr" ? "" : "/en";

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-interieur.png"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Gradient : plus sombre à droite pour lire le formulaire */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Main content — deux colonnes */}
      <div className="relative z-10 flex-1 flex items-center px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── Colonne gauche : accroche ── */}
          <div>
            {/* Bloc headline */}
            <div className="mb-10 max-w-2xl">
              {/* Grand titre — service */}
              <h1 className="mb-3">
                <span className="block font-heading text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.75rem] leading-[1.1] font-normal text-white">
                  {t("title")}
                </span>
                <span className="block font-heading text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.75rem] leading-[1.1] font-bold text-[#7A0D0A] mt-1">
                  {t("title_price")}
                </span>
              </h1>

              {/* Séparateur */}
              <div className="flex items-center gap-4 my-7">
                <div className="w-12 h-px bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#7A0D0A]/60" />
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Sous-titre */}
              <div className="max-w-xl pl-5 md:pl-6 border-l-[3px] border-[#7A0D0A]">
                <p className="font-serif italic text-[1.0625rem] sm:text-lg md:text-xl lg:text-[1.35rem] leading-[1.65] md:leading-[1.7] text-white/92 font-normal tracking-[0.01em] [text-shadow:0_1px_2px_rgba(0,0,0,0.35),0_4px_24px_rgba(0,0,0,0.45)]">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            {/* CTA projets — lien discret + tiret (comme avant le gros bouton plein) */}
            <Link
              href={`${prefix}/projets`}
              className="inline-flex items-center gap-3 text-white/60 text-sm tracking-wide hover:text-white transition-colors group mb-10"
            >
              <span className="w-8 h-px shrink-0 bg-white/30 group-hover:bg-white transition-colors" />
              <span className="inline-flex items-center gap-2">
                {t("cta_projects")}
                <span aria-hidden className="text-white/45 group-hover:text-white transition-colors">
                  →
                </span>
              </span>
            </Link>

            {/* Stats inline */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-4">
              {[
                { val: "+30", label: "Réalisations" },
                { val: "84 %", label: "Taux d'occupation" },
                { val: "4 sem.", label: "Clé à mise en ligne" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-2xl text-[#7A0D0A] leading-none">{s.val}</p>
                  <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Hotline */}
            <div className="flex items-center gap-4 text-white/40 mt-10">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[10px] tracking-[0.25em] uppercase">Ligne directe 24h/24</span>
              <a
                href="https://wa.me/212661260719"
                className="text-[#7A0D0A] text-sm font-medium hover:text-white transition-colors"
              >
                +212 661 260 719
              </a>
            </div>
          </div>

          {/* ── Colonne droite : formulaire (léger décalage vers la gauche sur desktop) ── */}
          <div className="w-full lg:-translate-x-3 xl:-translate-x-5 2xl:-translate-x-6">
            {/* Card glassmorphism */}
            <div className="bg-black/50 backdrop-blur-md border border-white/15 p-8">
              {/* En-tête carte */}
              <div className="mb-6">
                <p className="text-[10px] text-[#F8AD9C] tracking-[0.35em] uppercase mb-2">
                  {t("form_kicker")}
                </p>
                <h2 className="text-white font-heading leading-[1.15] uppercase tracking-[0.08em] text-[0.8125rem] sm:text-base md:text-lg">
                  {t("form_title")}
                </h2>
                <div className="w-10 h-0.5 bg-[#7A0D0A] mt-3" />
              </div>

              <HeroForm />

              {/* WhatsApp fallback */}
              <a
                href="https://wa.me/212661260719"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2.5 border border-white/15 text-white/60 text-xs tracking-wide py-3 hover:border-white/30 hover:text-white transition-all w-full"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.116 1.535 5.845L.057 23.5l5.835-1.53A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.031-1.372l-.361-.214-3.735.979.996-3.638-.235-.374A9.863 9.863 0 012.1 12c0-5.467 4.433-9.9 9.9-9.9 5.467 0 9.9 4.433 9.9 9.9 0 5.467-4.433 9.9-9.9 9.9z" />
                </svg>
                Écrire directement sur WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
