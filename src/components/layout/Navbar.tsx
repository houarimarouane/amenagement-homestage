"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = locale === "fr" ? "" : "/en";
  const altLocale = locale === "fr" ? "en" : "fr";
  const altPath = locale === "fr" ? "/en" : "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href={`${prefix}/`}
          className={`font-serif text-2xl tracking-wide transition-colors ${
            scrolled || menuOpen ? "text-[#1A1A1A]" : "text-white"
          }`}
        >
          Homestage
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href={`${prefix}/#services`}
            className={`text-sm transition-colors hover:text-[#C9A96E] ${
              scrolled ? "text-[#6B6B6B]" : "text-white/90"
            }`}
          >
            {t("services")}
          </Link>
          <Link
            href={`${prefix}/projets`}
            className={`text-sm transition-colors hover:text-[#C9A96E] ${
              scrolled ? "text-[#6B6B6B]" : "text-white/90"
            }`}
          >
            {t("projects")}
          </Link>
          <Link
            href={`${prefix}/#contact`}
            className="text-sm bg-[#C9A96E] text-white px-5 py-2.5 hover:bg-[#b8945a] transition-colors"
          >
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={altPath}
            className={`text-sm font-medium transition-colors border px-3 py-1 ${
              scrolled || menuOpen
                ? "text-[#6B6B6B] border-[#6B6B6B]/20 hover:text-[#C9A96E]"
                : "text-white border-white/40 hover:border-white"
            }`}
          >
            {altLocale.toUpperCase()}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-px mb-1 transition-colors ${
                scrolled || menuOpen ? "bg-[#1A1A1A]" : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-px mb-1 transition-colors ${
                scrolled || menuOpen ? "bg-[#1A1A1A]" : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-px transition-colors ${
                scrolled || menuOpen ? "bg-[#1A1A1A]" : "bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#1A1A1A]/10 px-6 py-4 flex flex-col gap-4">
          <Link
            href={`${prefix}/#services`}
            onClick={() => setMenuOpen(false)}
            className="text-sm text-[#6B6B6B] hover:text-[#C9A96E]"
          >
            {t("services")}
          </Link>
          <Link
            href={`${prefix}/projets`}
            onClick={() => setMenuOpen(false)}
            className="text-sm text-[#6B6B6B] hover:text-[#C9A96E]"
          >
            {t("projects")}
          </Link>
          <Link
            href={`${prefix}/#contact`}
            onClick={() => setMenuOpen(false)}
            className="text-sm bg-[#C9A96E] text-white px-5 py-2.5 text-center"
          >
            {t("contact")}
          </Link>
        </div>
      )}
    </header>
  );
}
