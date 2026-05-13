import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

/** Renseigner l’URL quand la page existe ; sinon laisser null (icône / lien masqués). */
const SOCIAL_URLS = {
  facebook: null as string | null,
  instagram: "https://instagram.com",
  x: null as string | null,
};

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
  const locale = await getLocale();
  const prefix = locale === "fr" ? "" : "/en";

  const columnTitleClass =
    "text-[11px] font-bold uppercase tracking-[0.28em] text-white mb-6";

  const listLinkClass =
    "text-sm text-white/60 hover:text-white transition-colors font-normal";

  const enterpriseLinks = [
    { label: t("co_about"), href: `${prefix}/#whyus` as const },
    { label: t("co_properties"), href: "https://www.homestage.ma" as const },
    { label: t("co_estimation"), href: "https://www.homestage.ma/estimer-mon-bien" as const },
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

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 pb-14 border-b border-white/10">
          {/* Colonne marque */}
          <div className="lg:col-span-1">
            <Image src="/logo-white.png" alt="Homestage" width={200} height={80} className="mb-5 h-auto max-w-[180px]" />
            <p className="text-sm text-white/70 leading-relaxed mb-8 whitespace-pre-line">{t("tagline")}</p>
            <div className="flex items-center gap-3">
              {SOCIAL_URLS.facebook ? (
                <a
                  href={SOCIAL_URLS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : null}
              {SOCIAL_URLS.instagram ? (
                <a
                  href={SOCIAL_URLS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="3.5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              ) : null}
              {SOCIAL_URLS.x ? (
                <a
                  href={SOCIAL_URLS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
                  aria-label="X"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          {/* ENTREPRISE — pas de lien si pas de page (blog, carrières omis) */}
          <div>
            <p className={columnTitleClass}>{t("enterprise_column")}</p>
            <ul className="space-y-4">
              {enterpriseLinks.map((item) => (
                <li key={item.href}>
                  {item.href.startsWith("http") ? (
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

          {/* SERVICES */}
          <div>
            <p className={columnTitleClass}>{t("services_column")}</p>
            <ul className="space-y-4">
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

          {/* CONTACT + newsletter */}
          <div>
            <p className={columnTitleClass}>{t("contact_column")}</p>
            <ul className="space-y-5 text-sm text-white/70 mb-8">
              <li className="flex gap-3">
                <PinIcon className="w-5 h-5 shrink-0 text-white/50 mt-0.5" />
                <span className="leading-relaxed">{t("address")}</span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="w-5 h-5 shrink-0 text-white/50 mt-0.5" />
                <a href="tel:+212661260719" className={`${listLinkClass} inline`}>
                  +212 661 260 719
                </a>
              </li>
              <li className="flex gap-3">
                <EnvelopeIcon className="w-5 h-5 shrink-0 text-white/50 mt-0.5" />
                <a href={`mailto:${contactEmail}`} className={`${listLinkClass} inline break-all`}>
                  {contactEmail}
                </a>
              </li>
            </ul>

            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/50 mb-3">{t("newsletter_title")}</p>
            <div className="flex border border-white/15 rounded-sm overflow-hidden max-w-md">
              <input
                type="email"
                name="newsletter-email"
                autoComplete="email"
                placeholder={t("newsletter_placeholder")}
                className="flex-1 bg-transparent text-white placeholder:text-white/35 text-sm px-4 py-3 outline-none focus:bg-white/5 min-w-0"
              />
              <button
                type="button"
                className="bg-white text-black px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors shrink-0"
              >
                {t("newsletter_cta")}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <span>
            © {new Date().getFullYear()} Homestage. {t("rights")}
          </span>
          {legalItems.length > 0 ? (
            <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-2 text-[11px] sm:text-xs">
              {legalItems.map((item, i) => (
                <span key={item.href} className="inline-flex items-center gap-x-3">
                  {i > 0 ? <span className="text-white/20 select-none">·</span> : null}
                  <a href={item.href} className="hover:text-white transition-colors whitespace-nowrap">
                    {item.label}
                  </a>
                </span>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
