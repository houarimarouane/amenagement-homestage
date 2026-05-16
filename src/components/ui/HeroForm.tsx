"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export default function HeroForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "hero_callback",
          name: data.name,
          phone: data.phone,
        }),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-3 text-sm focus:outline-none focus:border-[#7A0D0A] focus:bg-white/15 transition-all backdrop-blur-sm";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#7A0D0A]/20 border border-[#7A0D0A]/40 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#7A0D0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-white font-medium text-lg mb-1">{t("hero_success_title")}</p>
          <p className="text-white/60 text-sm">{t("hero_success_subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-[#7A0D0A] text-xs tracking-widest uppercase hover:text-white transition-colors"
        >
          {t("hero_new_request")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input
          {...register("name")}
          className={inputClass}
          placeholder={t("hero_placeholder_name")}
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-[#F8AD9C] text-xs mt-1 pl-1">{t("hero_error_name")}</p>
        )}
      </div>

      <div>
        <input
          {...register("phone")}
          type="tel"
          className={inputClass}
          placeholder={t("hero_placeholder_phone")}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-[#F8AD9C] text-xs mt-1 pl-1">{t("hero_error_phone")}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#7A0D0A] text-white py-4 font-medium text-sm uppercase tracking-[0.12em] hover:bg-[#5A0A07] transition-colors disabled:opacity-60 cursor-pointer mt-1"
      >
        {status === "loading" ? t("hero_submit_loading") : t("hero_submit")}
      </button>

      {status === "error" && (
        <p className="text-[#F8AD9C] text-xs text-center">{t("hero_error_generic")}</p>
      )}

      <p className="text-white/30 text-[10px] text-center tracking-wide pt-1">{t("hero_footnote")}</p>
    </form>
  );
}
