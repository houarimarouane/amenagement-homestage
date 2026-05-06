import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#1A1A1A] text-white/60 py-14 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-serif text-2xl text-white mb-2">Homestage</p>
            <p className="text-sm leading-relaxed">{t("tagline")}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white mb-4 uppercase tracking-widest">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#services"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projets"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Projets
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white mb-4 uppercase tracking-widest">
              Contact
            </p>
            <p className="text-sm">📍 {t("address")}</p>
            <p className="text-sm mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C9A96E] transition-colors"
              >
                Instagram
              </a>
              {" · "}
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C9A96E] transition-colors"
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Homestage. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
