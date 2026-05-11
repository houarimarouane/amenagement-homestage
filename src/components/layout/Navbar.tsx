"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const altLocale = locale === "fr" ? "en" : "fr";
  const altPath = locale === "fr" ? "/en" : "/";

  const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/en/";
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
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <Link href={`${prefix}/`} className="flex items-center shrink-0">
            <Image
              src={isLight ? "/logo-black.png" : "/logo-white.png"}
              alt="Homestage"
              width={220}
              height={88}
              priority
              className={`max-w-[160px] sm:max-w-[200px] md:max-w-[220px] h-auto ${!isLight ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" : ""}`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 flex-wrap justify-end flex-1 min-w-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[11px] xl:text-xs font-medium transition-colors hover:text-[#7A0D0A] whitespace-nowrap ${
                  isLight ? "text-[#1A1714]" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${prefix}/#contact`}
              className="text-[11px] xl:text-xs bg-[#7A0D0A] text-white px-4 xl:px-6 py-2.5 hover:bg-[#5A0A07] transition-colors font-medium tracking-wide whitespace-nowrap"
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={altPath}
              className={`text-xs font-medium transition-colors border px-3 py-1 tracking-widest hover:text-[#7A0D0A] hover:border-[#7A0D0A] ${
                isLight
                  ? "text-[#1A1714]/70 border-[#1A1714]/20"
                  : "text-white/70 border-white/20"
              }`}
            >
              {altLocale.toUpperCase()}
            </Link>

            <button
              className="lg:hidden p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-5 h-px mb-1.5 transition-all duration-300 ${isLight ? "bg-[#1A1714]" : "bg-white"}`} />
              <span className={`block w-5 h-px mb-1.5 transition-all duration-300 ${isLight ? "bg-[#1A1714]" : "bg-white"}`} />
              <span className={`block w-5 h-px transition-all duration-300 ${isLight ? "bg-[#1A1714]" : "bg-white"}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E5E0DC] px-6 py-6 flex flex-col gap-5 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#6B6560] hover:text-[#7A0D0A] transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${prefix}/#contact`}
              onClick={() => setMenuOpen(false)}
              className="text-sm bg-[#7A0D0A] text-white px-5 py-3 text-center font-medium hover:bg-[#5A0A07] transition-colors"
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
