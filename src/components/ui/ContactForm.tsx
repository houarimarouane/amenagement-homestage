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
  projectType: z.enum(["airbnb", "renovation", "decoration"]),
  budget: z.enum(["<50k", "50-150k", "150-300k", ">300k"]),
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
    "w-full border border-[#1A1A1A]/15 bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#C9A96E] transition-colors";
  const labelClass =
    "block text-xs font-medium text-[#6B6B6B] uppercase tracking-wider mb-1.5";
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t("project_type")}</label>
          <select {...register("projectType")} className={inputClass}>
            <option value="">{t("project_type_placeholder")}</option>
            <option value="airbnb">{t("project_airbnb")}</option>
            <option value="renovation">{t("project_renovation")}</option>
            <option value="decoration">{t("project_decoration")}</option>
          </select>
          {errors.projectType && <p className={errorClass}>Requis</p>}
        </div>
        <div>
          <label className={labelClass}>{t("budget")}</label>
          <select {...register("budget")} className={inputClass}>
            <option value="">{t("budget_placeholder")}</option>
            <option value="<50k">{t("budget_1")}</option>
            <option value="50-150k">{t("budget_2")}</option>
            <option value="150-300k">{t("budget_3")}</option>
            <option value=">300k">{t("budget_4")}</option>
          </select>
          {errors.budget && <p className={errorClass}>Requis</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("message")}</label>
        <textarea
          {...register("message")}
          rows={4}
          className={inputClass}
          placeholder="Décrivez votre bien et vos attentes..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#C9A96E] text-white py-4 font-medium tracking-wide hover:bg-[#b8945a] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Envoi en cours..." : t("submit")}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-sm text-center bg-green-50 py-3 px-4">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm text-center bg-red-50 py-3 px-4">
          {t("error")}
        </p>
      )}
    </form>
  );
}
