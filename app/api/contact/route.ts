import { NextResponse } from "next/server";
import { SITE } from "@/constants/site";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot. Any value means a bot filled it. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // Bots fill hidden fields. Accept silently so they do not learn anything.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json(
      { error: "Your message needs at least 10 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No provider wired up yet — tell the client so it can open a prefilled
  // mail client rather than dropping the message on the floor.
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Email delivery is not configured yet — opening your mail app.",
        fallback: true,
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [SITE.email],
        reply_to: email,
        subject: `Portfolio enquiry — ${name}`,
        text: `${message}\n\n—\n${name}\n${email}`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not send right now.", fallback: true },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send right now.", fallback: true },
      { status: 502 },
    );
  }
}
