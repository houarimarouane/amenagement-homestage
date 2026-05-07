import { useTranslations } from "next-intl";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactSection() {
  const t = useTranslations("contact");
  const tAirbnb = useTranslations("airbnb");

  return (
    <>
      {/* CTA band — rouge foncé */}
      <section className="relative py-20 px-6 bg-[#7A0D0A] overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none select-none hidden lg:flex items-center justify-end pr-12">
          <span className="font-serif text-[16rem] leading-none text-white">&ldquo;</span>
        </div>
        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/70 text-[11px] font-medium tracking-[0.4em] uppercase mb-3">
              {tAirbnb("cta_label")}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight max-w-xl">
              {tAirbnb("cta_title")}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="#contact-form"
              className="bg-white text-[#7A0D0A] px-8 py-4 font-medium text-sm tracking-wide hover:bg-[#FAF8F5] transition-colors text-center"
            >
              {tAirbnb("cta_form")}
            </a>
            <a
              href="https://wa.me/212661260719"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 border-2 border-white text-white px-8 py-4 font-medium text-sm tracking-wide hover:bg-white hover:text-[#7A0D0A] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              {tAirbnb("cta_whatsapp")}
            </a>
          </div>
        </div>
      </section>

      {/* Contact section — fond blanc */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left — info panel */}
            <div className="lg:col-span-2">
              <p className="text-[#7A0D0A] text-[11px] font-medium tracking-[0.4em] uppercase mb-5">
                Contact
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1714] mb-6 leading-tight">
                {t("title")}
              </h2>
              <p className="text-[#6B6560] leading-relaxed mb-10">{t("subtitle")}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FAF8F5] border border-[#E5E0DC] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7A0D0A]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1A1714] text-sm font-medium mb-1">Adresse</p>
                    <p className="text-[#6B6560] text-sm leading-relaxed">
                      Guéliz, Rue de la Liberté<br />
                      Immeuble Dani, Bureau 16<br />
                      Marrakech, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FAF8F5] border border-[#E5E0DC] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7A0D0A]" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1A1714] text-sm font-medium mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/212661260719"
                      className="text-[#7A0D0A] text-sm hover:text-[#7A0D0A] transition-colors font-medium"
                    >
                      +212 661 260 719
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FAF8F5] border border-[#E5E0DC] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7A0D0A]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1A1714] text-sm font-medium mb-1">Instagram</p>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7A0D0A] text-sm hover:text-[#7A0D0A] transition-colors"
                    >
                      @homestage.ma
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[#E5E0DC]">
                <p className="text-[#6B6560] text-xs leading-relaxed">
                  Premier échange gratuit · Sans engagement · Réponse sous 24h
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div id="contact-form" className="lg:col-span-3 bg-[#FAF8F5] border border-[#E5E0DC] p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
