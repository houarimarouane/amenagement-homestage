import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, projectType, budget, message } = body;

  if (!name || !email || !phone || !projectType || !budget) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Homestage <contact@homestage.ma>",
        to: process.env.CONTACT_EMAIL ?? "houari.marouane@gmail.com",
        subject: `Nouvelle demande — ${name} (${projectType})`,
        text: `
Nom: ${name}
Email: ${email}
Téléphone: ${phone}
Type de projet: ${projectType}
Budget: ${budget}
Message: ${message ?? "—"}
        `.trim(),
      });
    } catch (err) {
      console.error("Email send error:", err);
      return NextResponse.json({ error: "Email error" }, { status: 500 });
    }
  } else {
    console.log("Contact form submission (no RESEND_API_KEY set):", {
      name,
      email,
      phone,
      projectType,
      budget,
      message,
    });
  }

  return NextResponse.json({ success: true });
}
