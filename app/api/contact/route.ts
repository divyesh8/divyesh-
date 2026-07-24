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

  // The address the email is sent from must be a domain you control in Resend
  // (or their shared onboarding address). The visitor's name becomes the
  // display name so your inbox shows the message as coming from them, and
  // reply_to is their address so Reply goes straight back. Strip characters
  // that could break or inject into the header.
  const safeName = name.replace(/[\r\n"<>]/g, " ").trim().slice(0, 80);
  const fromAddress = process.env.CONTACT_FROM ?? "onboarding@resend.dev";
  // Where submissions are delivered. Defaults to the public address, but with
  // Resend's shared onboarding sender this must be the email the Resend account
  // was created with — set CONTACT_TO to that inbox. Once a domain is verified
  // in Resend, CONTACT_TO can be any address.
  const toAddress = process.env.CONTACT_TO ?? SITE.email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${safeName || "Portfolio"} <${fromAddress}>`,
        to: [toAddress],
        reply_to: email,
        subject: `Portfolio — ${safeName || "New message"}`,
        text: `${message}\n\n—\n${name}\n${email}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend error", res.status, detail);
      return NextResponse.json(
        {
          error: "Could not send right now.",
          fallback: true,
          _to: toAddress,
          _detail: detail.slice(0, 400),
        },
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
