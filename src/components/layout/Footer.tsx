import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

/** Profils à affiner si besoin (pages officielles Homestage). */
const SOCIAL = {
  facebook: "https://www.facebook.com",
  instagram: "https://www.instagram.com",
  whatsapp: "https://wa.me/212661260719",
} as const;

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

export default async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const locale = await getLocale();
  const prefix = locale === "fr" ? "" : "/en";

  const columnTitleClass = "font-heading text-[13px] text-white mb-5";

  const listLinkClass =
    "text-sm text-white/70 hover:text-[#F8AD9C] transition-colors";

  const navLinks = [
    { href: `${prefix}/#approche`, label: tn("approach") },
    { href: `${prefix}/#processus`, label: tn("process") },
    { href: `${prefix}/#portfolio`, label: tn("portfolio") },
    { href: `${prefix}/#offre`, label: tn("offer") },
    { href: `${prefix}/#whyus`, label: tn("whyus") },
    { href: `${prefix}/#contact`, label: tn("contact") },
  ];

  const serviceLinks = [
    { label: t("svc_immobilier"), href: "https://www.homestage.ma", external: true },
    { label: t("svc_estimation"), href: "https://www.homestage.ma/estimer-mon-bien", external: true },
    { label: t("svc_shooting"), href: `${prefix}/#contact`, external: false },
    { label: t("svc_homestaging"), href: `${prefix}/#offre`, external: false },
    { label: t("svc_conciergerie"), href: "https://www.homestage.ma", external: true },
    { label: t("svc_fetes"), href: "https://www.marrakechvenues.com", external: true },
  ];

  const legalItems = [
    { label: t("legal_terms"), href: null as string | null },
    { label: t("legal_privacy"), href: null as string | null },
    { label: t("legal_mentions"), href: null as string | null },
    { label: t("legal_sales"), href: null as string | null },
  ].filter((item): item is { label: string; href: string } => item.href !== null);

  const contactEmail = t("contact_email");

  const socialLinkClass = "text-white/70 hover:text-[#F8AD9C] transition-colors";

  return (
    <footer className="bg-[#080808] text-white border-t border-white/10">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 lg:gap-y-12">
          {/* Colonne marque */}
          <div className="space-y-5">
            <Image
              src="/logo-white.png"
              alt="Homestage"
              width={240}
              height={60}
              className="h-14 w-auto md:h-12"
            />
            <p className="text-sm text-white/65 leading-[1.65]">{t("tagline")}</p>
            <div className="flex items-center space-x-4">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-4h2V9.5C10 7.57 11.57 6 13.5 6H16v4h-1.5c-.83 0-1.5.18-1.5 1V11h3l-.5 4h-2.5v7.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.116 1.535 5.845L.057 23.5l5.835-1.53A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.031-1.372l-.361-.214-3.735.979.996-3.638-.235-.374A9.863 9.863 0 012.1 12c0-5.467 4.433-9.9 9.9-9.9 5.467 0 9.9 4.433 9.9 9.9 0 5.467-4.433 9.9-9.9 9.9z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className={columnTitleClass}>{t("navigation_column")}</p>
            <ul className="space-y-3.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={listLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={columnTitleClass}>{t("services_column")}</p>
            <ul className="space-y-3.5">
              {serviceLinks.map((item) => (
                <li key={item.href + item.label}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={listLinkClass}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={listLinkClass}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={columnTitleClass}>{t("contact_column")}</p>
            <ul className="space-y-3.5 text-sm text-white/70 mb-8">
              <li className="flex gap-2">
                <PinIcon className="h-4 w-4 shrink-0 text-white/70 mt-0.5" />
                <span className="leading-relaxed">{t("address")}</span>
              </li>
              <li className="flex gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-white/70 mt-0.5" />
                <a href="tel:+212661260719" className={`${listLinkClass} inline`}>
                  +212 661 260 719
                </a>
              </li>
              <li className="flex gap-2">
                <EnvelopeIcon className="h-4 w-4 shrink-0 text-white/70 mt-0.5" />
                <a href={`mailto:${contactEmail}`} className={`${listLinkClass} inline break-all`}>
                  {contactEmail}
                </a>
              </li>
            </ul>

            <p className="font-heading text-[13px] text-white mt-8 mb-4">{t("newsletter_title")}</p>
            <div className="flex border border-white/10 rounded-sm overflow-hidden max-w-md">
              <input
                type="email"
                name="newsletter-email"
                autoComplete="email"
                placeholder={t("newsletter_placeholder")}
                className="flex-1 bg-transparent text-white placeholder:text-white/35 text-sm px-4 py-3 outline-none focus:bg-white/[0.03] min-w-0"
              />
              <button
                type="button"
                className="bg-white text-[#080808] px-5 py-3 text-sm font-medium hover:bg-white/90 transition-colors shrink-0"
              >
                {t("newsletter_cta")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16 border-t border-white/10 pt-10 flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Homestage. {t("rights")}
          </p>
          {legalItems.length > 0 ? (
            <nav className="flex flex-wrap items-center gap-x-6 text-sm">
              {legalItems.map((item) => (
                <a key={item.href} href={item.href} className="text-white/70 hover:text-[#F8AD9C] transition-colors whitespace-nowrap">
                  {item.label}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
