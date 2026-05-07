"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  projectType: z.enum(["airbnb", "renovation", "decoration"]),
});

type FormData = z.infer<typeof schema>;

export default function HeroForm() {
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
        body: JSON.stringify({ ...data, email: "", message: "", budget: "<50k" }),
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

  const selectClass =
    "w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#7A0D0A] focus:bg-white/15 transition-all backdrop-blur-sm appearance-none cursor-pointer";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#7A0D0A]/20 border border-[#7A0D0A]/40 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#7A0D0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-white font-medium text-lg mb-1">Demande envoyée !</p>
          <p className="text-white/60 text-sm">Nous vous rappelons sous 24h.</p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#7A0D0A] text-xs tracking-widest uppercase hover:text-white transition-colors"
        >
          Nouvelle demande →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* Name */}
      <div>
        <input
          {...register("name")}
          className={inputClass}
          placeholder="Votre nom"
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-[#F8AD9C] text-xs mt-1 pl-1">Minimum 2 caractères</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          {...register("phone")}
          type="tel"
          className={inputClass}
          placeholder="+212 6XX XXX XXX"
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-[#F8AD9C] text-xs mt-1 pl-1">Numéro requis</p>
        )}
      </div>

      {/* Project type */}
      <div className="relative">
        <select {...register("projectType")} className={selectClass}>
          <option value="" className="bg-[#1A1714] text-white/60">
            Type de projet
          </option>
          <option value="airbnb" className="bg-[#1A1714] text-white">
            Airbnb Clé-en-Main
          </option>
          <option value="renovation" className="bg-[#1A1714] text-white">
            Rénovation Complète
          </option>
          <option value="decoration" className="bg-[#1A1714] text-white">
            Aménagement & Décoration
          </option>
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.projectType && (
          <p className="text-[#F8AD9C] text-xs mt-1 pl-1">Sélectionnez un type</p>
        )}
      </div>

      {/* CTA */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#7A0D0A] text-white py-4 font-medium text-sm tracking-[0.1em] uppercase hover:bg-[#5A0A07] transition-colors disabled:opacity-60 cursor-pointer mt-1"
      >
        {status === "loading" ? "Envoi en cours…" : "Obtenir mon devis gratuit"}
      </button>

      {status === "error" && (
        <p className="text-[#F8AD9C] text-xs text-center">
          Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.
        </p>
      )}

      <p className="text-white/30 text-[10px] text-center tracking-wide pt-1">
        Sans engagement · Réponse sous 24h
      </p>
    </form>
  );
}
