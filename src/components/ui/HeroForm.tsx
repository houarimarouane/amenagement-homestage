"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const slotEnum = z.enum(["morning", "afternoon", "evening"]);

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  callbackSlots: z.array(slotEnum).min(1),
});

type FormData = z.infer<typeof schema>;

const SLOT_KEYS = ["morning", "afternoon", "evening"] as const;

export default function HeroForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      callbackSlots: [],
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
          callbackSlots: data.callbackSlots,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div>
        <p className="text-white/55 text-[11px] uppercase tracking-[0.2em] mb-2.5">{t("hero_callback_label")}</p>
        <Controller
          name="callbackSlots"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {SLOT_KEYS.map((key) => {
                const checked = field.value.includes(key);
                return (
                  <label
                    key={key}
                    className={`flex cursor-pointer select-none flex-col items-center gap-2 rounded border px-1.5 py-2.5 text-center transition-colors sm:px-2 sm:py-3 ${
                      checked
                        ? "border-[#7A0D0A]/80 bg-[#7A0D0A]/15 text-white"
                        : "border-white/20 bg-white/5 text-white/85 hover:border-white/35"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      className="h-3.5 w-3.5 shrink-0 accent-[#7A0D0A] sm:h-4 sm:w-4"
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...new Set([...field.value, key])]
                          : field.value.filter((v) => v !== key);
                        field.onChange(next);
                      }}
                    />
                    <span className="text-[10px] leading-snug sm:text-[11px]">{t(`hero_slot_${key}`)}</span>
                  </label>
                );
              })}
            </div>
          )}
        />
        {errors.callbackSlots && (
          <p className="text-[#F8AD9C] text-xs mt-2 pl-1">{t("hero_error_slots")}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#7A0D0A] text-white py-4 font-medium text-sm tracking-wide hover:bg-[#5A0A07] transition-colors disabled:opacity-60 cursor-pointer mt-1"
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
