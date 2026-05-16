import { NextRequest, NextResponse } from "next/server";

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

const CALLBACK_SLOT_LABELS: Record<string, string> = {
  morning: "Matin (9h–12h)",
  afternoon: "Après-midi (14h–18h)",
  evening: "Soir (17h–20h)",
};

function formatCallbackSlots(slots: string[]) {
  const uniq = [...new Set(slots)];
  return uniq.map((s) => CALLBACK_SLOT_LABELS[s] ?? s).join(", ");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    intent,
    name,
    email,
    phone,
    address,
    apartmentDetails,
    message,
    callbackSlots,
  } = body;

  const apiKey = process.env.RESEND_API_KEY;

  /** Hero — demande de rappel uniquement */
  if (intent === "hero_callback") {
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!Array.isArray(callbackSlots) || callbackSlots.length === 0) {
      return NextResponse.json({ error: "Missing callback slots" }, { status: 400 });
    }
    const allowed = new Set(["morning", "afternoon", "evening"]);
    if (!callbackSlots.every((s: unknown) => typeof s === "string" && allowed.has(s))) {
      return NextResponse.json({ error: "Invalid callback slots" }, { status: 400 });
    }

    const slotsLine = formatCallbackSlots(callbackSlots as string[]);

    if (apiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);

        await resend.emails.send({
          from: "Homestage <contact@homestage.ma>",
          to: process.env.CONTACT_EMAIL ?? "houari.marouane@gmail.com",
          subject: `Demande de rappel — ${name}`,
          text: `
Formulaire hero (rappel téléphonique)
Nom: ${name}
Téléphone: ${phone}
Créneaux souhaités: ${slotsLine}
          `.trim(),
        });
      } catch (err) {
        console.error("Email send error:", err);
        return NextResponse.json({ error: "Email error" }, { status: 500 });
      }
    } else {
      console.log("Hero callback (no RESEND_API_KEY set):", {
        name,
        phone,
        callbackSlots,
      });
    }

    return NextResponse.json({ success: true });
  }

  /** Formulaire contact page — détail projet */
  if (!name?.trim() || !phone?.trim() || !address?.trim() || !apartmentDetails?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const emailStr = typeof email === "string" ? email.trim() : "";
  if (emailStr && !isValidEmail(emailStr)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Homestage <contact@homestage.ma>",
        to: process.env.CONTACT_EMAIL ?? "houari.marouane@gmail.com",
        subject: `Nouvelle demande Airbnb — ${name}`,
        text: `
Nom: ${name}
Email: ${emailStr || "—"}
Téléphone: ${phone}
Adresse du bien: ${address}
Détails appartement: ${apartmentDetails}
Message: ${message?.trim() ? message : "—"}
        `.trim(),
      });
    } catch (err) {
      console.error("Email send error:", err);
      return NextResponse.json({ error: "Email error" }, { status: 500 });
    }
  } else {
    console.log("Contact form submission (no RESEND_API_KEY set):", {
      name,
      email: emailStr || null,
      phone,
      address,
      apartmentDetails,
      message,
    });
  }

  return NextResponse.json({ success: true });
}
