"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(5),
  apartmentDetails: z.string().min(10),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    "w-full border border-[#E5E0DC] bg-white px-4 py-3 text-sm text-foreground placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#7A0D0A] transition-colors";
  const labelClass =
    "block text-xs font-medium text-[#6B6560] uppercase tracking-wider mb-1.5";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t("name")}</label>
          <input
            {...register("name")}
            className={inputClass}
            placeholder="Ahmed Benali"
          />
          {errors.name && <p className={errorClass}>Requis (min. 2 caractères)</p>}
        </div>
        <div>
          <label className={labelClass}>{t("email")}</label>
          <input
            {...register("email")}
            type="email"
            className={inputClass}
            placeholder="ahmed@email.com"
          />
          {errors.email && <p className={errorClass}>Email invalide</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("phone")}</label>
        <input
          {...register("phone")}
          type="tel"
          className={inputClass}
          placeholder="+212 6XX XXX XXX"
        />
        {errors.phone && <p className={errorClass}>Requis</p>}
      </div>

      <div>
        <label className={labelClass}>{t("address")}</label>
        <input
          {...register("address")}
          className={inputClass}
          placeholder={t("address_placeholder")}
        />
        {errors.address && <p className={errorClass}>{t("error_address")}</p>}
      </div>

      <div>
        <label className={labelClass}>{t("apartment_details")}</label>
        <textarea
          {...register("apartmentDetails")}
          rows={4}
          className={inputClass}
          placeholder={t("apartment_details_placeholder")}
        />
        {errors.apartmentDetails && <p className={errorClass}>{t("error_apartment_details")}</p>}
      </div>

      <div>
        <label className={labelClass}>{t("message")}</label>
        <textarea
          {...register("message")}
          rows={3}
          className={inputClass}
          placeholder={t("message_placeholder")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#7A0D0A] text-white py-4 font-medium tracking-wide hover:bg-[#5A0A07] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Envoi en cours..." : t("submit")}
      </button>

      {status === "success" && (
        <p className="text-[#7A0D0A] text-sm text-center bg-[#7A0D0A]/10 border border-[#7A0D0A]/20 py-3 px-4">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 py-3 px-4">
          {t("error")}
        </p>
      )}
    </form>
  );
}
