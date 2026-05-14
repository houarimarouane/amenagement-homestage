"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Link as IntlLink, usePathname } from "@/i18n/navigation";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = locale === "fr" ? "" : "/en";

  const isHomePage = pathname === "/";
  const isLight = !isHomePage || scrolled || menuOpen;

  const navItems = [
    { href: `${prefix}/#approche`, label: t("approach") },
    { href: `${prefix}/#processus`, label: t("process") },
    { href: `${prefix}/#portfolio`, label: t("portfolio") },
    { href: `${prefix}/#offre`, label: t("offer") },
    { href: `${prefix}/#whyus`, label: t("whyus") },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header
        className={`transition-all duration-300 ${
          isLight
            ? "bg-white border-b border-[#E5E0DC] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 h-20 relative flex items-center justify-between gap-4">
          <Link href={`${prefix}/`} className="flex items-center shrink-0 z-10">
            <Image
              src={isLight ? "/logo-black.png" : "/logo-white.png"}
              alt="Homestage"
              width={220}
              height={88}
              priority
              className={`max-w-[112px] sm:max-w-[148px] md:max-w-[200px] lg:max-w-[220px] h-auto ${!isLight ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" : ""}`}
            />
          </Link>

          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3 xl:gap-4 2xl:gap-5 flex-wrap max-w-[min(100%,42rem)] pointer-events-none [&_a]:pointer-events-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`[font-family:var(--font-montserrat)] font-bold text-[13px] leading-none uppercase tracking-[0.12em] transition-colors hover:text-[#7A0D0A] whitespace-nowrap ${
                  isLight ? "text-foreground" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 xl:gap-3 shrink-0 z-10 ml-auto">
            <Link
              href={`${prefix}/#contact`}
              className="hidden lg:inline-flex text-sm xl:text-base bg-[#7A0D0A] text-white px-3 xl:px-5 py-2.5 hover:bg-[#5A0A07] transition-colors font-extrabold uppercase tracking-[0.12em] whitespace-nowrap"
            >
              {t("contact")}
            </Link>

            <div
              className={`hidden lg:flex items-center rounded-md border overflow-hidden text-xs font-bold tracking-widest ${
                isLight
                  ? "border-foreground/20"
                  : "border-white/25"
              }`}
            >
              <IntlLink
                href={pathname}
                locale="fr"
                className={`px-2.5 py-1.5 transition-colors ${
                  locale === "fr"
                    ? "bg-[#7A0D0A] text-white"
                    : isLight
                      ? "text-foreground/60 hover:text-[#7A0D0A] hover:bg-foreground/5"
                      : "text-white/65 hover:text-white hover:bg-white/10"
                }`}
              >
                FR
              </IntlLink>
              <IntlLink
                href={pathname}
                locale="en"
                className={`px-2.5 py-1.5 transition-colors border-l ${
                  isLight ? "border-foreground/20" : "border-white/25"
                } ${
                  locale === "en"
                    ? "bg-[#7A0D0A] text-white"
                    : isLight
                      ? "text-foreground/60 hover:text-[#7A0D0A] hover:bg-foreground/5"
                      : "text-white/65 hover:text-white hover:bg-white/10"
                }`}
              >
                EN
              </IntlLink>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 -mr-2 ml-auto"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-px mb-1.5 transition-all duration-300 ${isLight ? "bg-foreground" : "bg-white"}`} />
              <span className={`block w-5 h-px mb-1.5 transition-all duration-300 ${isLight ? "bg-foreground" : "bg-white"}`} />
              <span className={`block w-5 h-px transition-all duration-300 ${isLight ? "bg-foreground" : "bg-white"}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E5E0DC] px-6 sm:px-8 py-6 flex flex-col gap-5 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="[font-family:var(--font-montserrat)] font-bold text-[13px] leading-snug uppercase tracking-[0.12em] text-[#6B6560] hover:text-[#7A0D0A] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-[#E5E0DC]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6B6560]">
                {t("language")}
              </span>
              <div className="flex items-center rounded-md border border-foreground/20 overflow-hidden text-xs font-bold tracking-widest">
                <IntlLink
                  href={pathname}
                  locale="fr"
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 transition-colors ${
                    locale === "fr"
                      ? "bg-[#7A0D0A] text-white"
                      : "text-foreground/60 hover:text-[#7A0D0A] hover:bg-foreground/5"
                  }`}
                >
                  FR
                </IntlLink>
                <IntlLink
                  href={pathname}
                  locale="en"
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 transition-colors border-l border-foreground/20 ${
                    locale === "en"
                      ? "bg-[#7A0D0A] text-white"
                      : "text-foreground/60 hover:text-[#7A0D0A] hover:bg-foreground/5"
                  }`}
                >
                  EN
                </IntlLink>
              </div>
            </div>
            <Link
              href={`${prefix}/#contact`}
              onClick={() => setMenuOpen(false)}
              className="text-base bg-[#7A0D0A] text-white px-5 py-3 text-center font-extrabold uppercase tracking-[0.12em] hover:bg-[#5A0A07] transition-colors"
            >
              {t("contact")}
            </Link>
            <a href="https://wa.me/212661260719" className="text-xs text-[#7A0D0A] font-medium tracking-wider">
              LIGNE 24/7 · +212 661 260 719
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
