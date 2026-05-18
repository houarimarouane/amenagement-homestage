"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Link as IntlLink, usePathname } from "@/i18n/navigation";

interface NavbarProps {
  locale: string;
}

function HeaderLogo({
  prefix,
  isLight,
  className,
  imageWidthsClassName,
}: {
  prefix: string;
  isLight: boolean;
  className?: string;
  /** Largeurs du logo (mobile navbar ≠ desktop) */
  imageWidthsClassName?: string;
}) {
  const widthClass =
    imageWidthsClassName ?? "w-[162px] sm:w-[176px] md:w-[200px]";
  return (
    <Link
      href={`${prefix}/`}
      className={`flex items-center justify-center shrink-0 ${className ?? ""}`}
    >
      <Image
        src={isLight ? "/logo-black.png" : "/logo-white.png"}
        alt="Homestage"
        width={260}
        height={104}
        sizes={imageWidthsClassName ? "(max-width: 1023px) 228px, 200px" : "(max-width: 767px) 168px, 200px"}
        priority
        className={`max-w-full ${widthClass} h-auto object-contain ${imageWidthsClassName ? "object-left" : "md:object-left"} shrink-0 ${!isLight ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" : ""}`}
      />
    </Link>
  );
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

  const separatorBorder = "border-[var(--color-border-separator)]";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header
        className={`transition-[background-color,box-shadow,border-color,color] duration-300 ${
          isLight
            ? `bg-white border-b ${separatorBorder} shadow-sm`
            : "bg-transparent border-b border-transparent text-white shadow-none"
        }`}
      >
        {/* Mobile : logo à gauche (plus grand), menu à droite */}
        <div className="lg:hidden flex items-center justify-between h-20 md:h-[5.5rem] max-w-7xl mx-auto px-4 md:px-6 gap-3 md:gap-4">
          <HeaderLogo
            prefix={prefix}
            isLight={isLight}
            className="justify-start min-w-0 flex-1"
            imageWidthsClassName="w-[200px] sm:w-[218px] md:w-[228px]"
          />
          <div className="flex justify-end items-center shrink-0">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center -mr-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span className="flex w-[22px] flex-col gap-[5px] sm:w-5 sm:gap-1.5">
                <span
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isLight ? "bg-foreground" : "bg-white"}`}
                />
                <span
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isLight ? "bg-foreground" : "bg-white"}`}
                />
                <span
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isLight ? "bg-foreground" : "bg-white"}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between h-20 md:h-[5.5rem] max-w-7xl mx-auto px-4 md:px-6 relative gap-3 md:gap-5">
          <HeaderLogo prefix={prefix} isLight={isLight} className="z-10 lg:justify-start" />

          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-6 xl:gap-10 flex-wrap max-w-[min(100%,42rem)] pointer-events-none [&_a]:pointer-events-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-nav-link transition-colors hover:text-[#7A0D0A] whitespace-nowrap ${
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
              className={`hidden lg:inline-flex h-9 items-center justify-center text-sm leading-none px-3 xl:px-3.5 transition-colors font-extrabold uppercase tracking-[0.12em] whitespace-nowrap ${
                isLight
                  ? "bg-[#7A0D0A] text-white hover:bg-[#5A0A07]"
                  : "bg-white text-[#7A0D0A] hover:bg-white/90"
              }`}
            >
              {t("contact")}
            </Link>

            <div
              className={`hidden lg:flex items-center rounded-md border overflow-hidden text-xs font-bold tracking-widest ${
                isLight ? "border-foreground/20" : "border-white/25"
              }`}
            >
              <IntlLink
                href={pathname}
                locale="fr"
                className={`px-2.5 py-1.5 transition-colors ${
                  locale === "fr"
                    ? isLight
                      ? "bg-[#7A0D0A] text-white"
                      : "bg-white text-[#7A0D0A]"
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
                    ? isLight
                      ? "bg-[#7A0D0A] text-white"
                      : "bg-white text-[#7A0D0A]"
                    : isLight
                      ? "text-foreground/60 hover:text-[#7A0D0A] hover:bg-foreground/5"
                      : "text-white/65 hover:text-white hover:bg-white/10"
                }`}
              >
                EN
              </IntlLink>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div
            className={`lg:hidden bg-white border-t ${separatorBorder} px-4 md:px-6 py-6 flex flex-col gap-5 max-h-[calc(100vh-5rem)] md:max-h-[calc(100vh-5.5rem)] overflow-y-auto max-w-7xl mx-auto w-full`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-nav-link text-[#6B6560] hover:text-[#7A0D0A] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className={`flex items-center gap-3 pt-2 border-t ${separatorBorder}`}>
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
              className="inline-flex h-9 w-full items-center justify-center text-sm leading-none bg-[#7A0D0A] text-white px-4 hover:bg-[#5A0A07] transition-colors font-extrabold uppercase tracking-[0.12em]"
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
