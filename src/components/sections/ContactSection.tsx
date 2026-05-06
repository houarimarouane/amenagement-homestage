import { useTranslations } from "next-intl";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-24 px-6 bg-[#F5F3EF]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Contact
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#6B6B6B] text-lg">{t("subtitle")}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
