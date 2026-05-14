"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const STEP_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 21 21" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.86a.5.5 0 0 1-.62-.62l.86-2.873a2 2 0 0 1 .506-.854z" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
    <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
    <path d="M4 18v2" />
    <path d="M20 18v2" />
    <path d="M12 4v9" />
  </svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>,
];

/** Trois vues portrait + une vue paysage sous la grille « Notre approche » */
const APPROCHE_PHOTOS = ["/approche-1.png", "/approche-2.png", "/approche-3.png"];
const APPROCHE_PHOTO_HORIZONTAL = "/approche-4.png";

export function AirbnbApproachSection() {
  const t = useTranslations("airbnb");
  const approachRef = useReveal();
  const approachItems = t.raw("approach_items") as string[];

  return (
    <section id="approche" className="scroll-mt-24 py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          ref={approachRef}
          data-visible="false"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
        >
          <div>
            <p className="text-[#7A0D0A] text-[11px] font-medium tracking-[0.4em] uppercase mb-5">
              {t("approach_label")}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground leading-tight mb-6">
              {t("approach_title")}
            </h2>
            <p className="text-[#6B6560] leading-relaxed mb-5">
              {t("approach_p1")}
            </p>
            <p className="text-[#6B6560] leading-relaxed mb-8">
              {t("approach_p2")}
            </p>

            <p className="text-foreground text-sm font-medium mb-4">
              {t("approach_list_label")}
            </p>
            <ul className="space-y-3 mb-10">
              {approachItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 shrink-0 border border-[#7A0D0A] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#7A0D0A]" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="#contact"
              className="inline-block bg-[#7A0D0A] text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-[#5A0A07] transition-colors"
            >
              {t("cta_form")}
            </Link>
          </div>

          <div className="w-full flex justify-center lg:justify-end mt-2 lg:mt-0">
            <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-md lg:max-w-[26rem]">
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 h-44 sm:h-52 md:h-56 lg:h-60">
                {APPROCHE_PHOTOS.map((src) => (
                  <div key={src} className="relative min-h-0 min-w-0 overflow-hidden">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 28vw, 140px"
                      className="object-cover object-center hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
              <div className="relative w-full overflow-hidden aspect-[16/9]">
                <Image
                  src={APPROCHE_PHOTO_HORIZONTAL}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 416px"
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AirbnbProcessSection() {
  const t = useTranslations("airbnb");

  const steps = [
    { num: "01", title: t("s1_title"), desc: t("s1_desc") },
    { num: "02", title: t("s2_title"), desc: t("s2_desc") },
    { num: "03", title: t("s3_title"), desc: t("s3_desc") },
    { num: "04", title: t("s4_title"), desc: t("s4_desc") },
    { num: "05", title: t("s5_title"), desc: t("s5_desc") },
  ];

  return (
    <section id="processus" className="scroll-mt-24 py-24 px-6 bg-[#FBF6F1]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#7A0D0A] text-[11px] font-medium tracking-[0.4em] uppercase mb-5">
            {t("process_label")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground">
            {t("process_title")}
          </h2>
        </div>

        <div className="hidden lg:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex-1 group relative">
              {i < steps.length - 1 && (
                <div className="absolute top-[2.25rem] left-[calc(50%+2.25rem)] right-0 h-px bg-[#E5E0DC] z-0" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center px-3">
                <div className="flex items-center justify-center mb-4 text-[#7A0D0A] [&>svg]:w-10 [&>svg]:h-10">
                  {STEP_ICONS[i]}
                </div>
                <span className="text-[#7A0D0A]/60 text-[11px] font-medium tracking-[0.35em] mb-4">
                  {step.num}
                </span>
                <div className="w-6 h-px bg-[#7A0D0A]/40 mb-4" />
                <h3 className="font-heading-titlecase text-base md:text-lg text-foreground mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[#6B6560] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center shrink-0 text-[#7A0D0A] [&>svg]:w-8 [&>svg]:h-8">
                  {STEP_ICONS[i]}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-[#E5E0DC] my-2 min-h-[2rem]" />
                )}
              </div>
              <div className={i < steps.length - 1 ? "pb-10" : ""}>
                <span className="text-[#7A0D0A]/60 text-[11px] font-medium tracking-[0.35em]">
                  {step.num}
                </span>
                <h3 className="font-heading-titlecase text-lg text-foreground mt-1 mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[#6B6560] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-[#E5E0DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[#6B6560] text-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <span>{t("trust_note")}</span>
          </div>
          <div className="flex items-center gap-2 text-[#7A0D0A] text-sm font-medium">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span>{t("trust_listing")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AirbnbOfferSection() {
  const t = useTranslations("airbnb");

  return (
    <section id="offre" className="scroll-mt-24 py-28 px-6 bg-[#FBF6F1]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="inline-flex items-center gap-3 border border-[#7A0D0A] px-5 py-2.5 text-[11px] text-[#7A0D0A] tracking-[0.3em] uppercase">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {t("badge")}
          </span>
        </div>

        <p className="text-[#7A0D0A] text-[11px] font-medium tracking-[0.4em] uppercase mb-5">
          {t("label")}
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-tight mb-6 max-w-4xl">
          {t("title")}
        </h2>
        <p className="text-[#6B6560] text-lg leading-relaxed max-w-2xl">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
