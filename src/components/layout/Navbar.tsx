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

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav */}
      <header
        className={`transition-all duration-300 ${
          isLight
            ? "bg-white border-b border-[#E5E0DC] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href={`${prefix}/`} className="flex items-center">
            <Image
              src={isLight ? "/logo-black.png" : "/logo-white.png"}
              alt="Homestage"
              width={220}
              height={88}
              priority
              className={!isLight ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" : ""}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: `${prefix}/#services`, label: t("services") },
              { href: `${prefix}/projets`, label: t("projects") },
              { href: `${prefix}/#airbnb`, label: "Airbnb" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#7A0D0A] ${
                  isLight ? "text-[#1A1714]" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${prefix}/#contact`}
              className="text-sm bg-[#7A0D0A] text-white px-6 py-2.5 hover:bg-[#5A0A07] transition-colors font-medium tracking-wide"
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
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
              className="md:hidden p-1"
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
          <div className="md:hidden bg-white border-t border-[#E5E0DC] px-6 py-6 flex flex-col gap-5">
            {[
              { href: `${prefix}/#services`, label: t("services") },
              { href: `${prefix}/projets`, label: t("projects") },
              { href: `${prefix}/#airbnb`, label: "Airbnb" },
            ].map((item) => (
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
