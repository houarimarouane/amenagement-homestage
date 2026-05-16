import { NextRequest, NextResponse } from "next/server";

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
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
  } = body;

  const apiKey = process.env.RESEND_API_KEY;

  /** Hero — demande de rappel uniquement */
  if (intent === "hero_callback") {
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

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
