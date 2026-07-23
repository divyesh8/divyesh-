"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Github, Linkedin, Loader2, Mail, MapPin, Send } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Magnetic } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE, SOCIALS } from "@/constants/site";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("sending");
    setMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        // When no mail provider is configured the API says so, and we hand
        // the visitor a mailto with everything already filled in.
        setMessage(json.error ?? "Something went wrong. Try email instead.");
        if (json.fallback) {
          const subject = encodeURIComponent(`Portfolio — ${data.name}`);
          const body = encodeURIComponent(
            `${data.message}\n\n— ${data.name} (${data.email})`,
          );
          window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
        }
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Try email instead.");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something."
        lede="Open to internships, freelance work, and collaborations. I read everything that comes in."
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Form */}
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-7 sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="eyebrow mb-2.5 block"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="eyebrow mb-2.5 block">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="eyebrow mb-2.5 block">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                maxLength={4000}
                placeholder="What are you working on?"
              />
            </div>

            {/* Honeypot — bots fill it, humans never see it. */}
            <div aria-hidden className="absolute left-[-9999px]">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      Sending
                      <Loader2 className="animate-spin" />
                    </>
                  ) : status === "sent" ? (
                    <>
                      Sent
                      <Check />
                    </>
                  ) : (
                    <>
                      Send message
                      <Send />
                    </>
                  )}
                </Button>
              </Magnetic>

              <p
                role="status"
                aria-live="polite"
                className="text-[13px] text-muted"
              >
                {status === "sent"
                  ? "Thanks — I'll get back to you soon."
                  : status === "error"
                    ? message
                    : null}
              </p>
            </div>
          </form>
        </Reveal>

        {/* Direct channels */}
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-7 sm:p-9">
            <p className="eyebrow mb-7">Direct</p>

            <ul className="space-y-1">
              {[
                {
                  label: "Email",
                  value: SITE.email,
                  href: `mailto:${SITE.email}`,
                  Icon: Mail,
                },
                {
                  label: "LinkedIn",
                  value: "Divyesh Kolli",
                  href: SOCIALS.linkedin,
                  Icon: Linkedin,
                },
                {
                  label: "GitHub",
                  value: "@divyesh8",
                  href: SOCIALS.github,
                  Icon: Github,
                },
              ].map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-3.5 transition-colors duration-300 hover:bg-[var(--panel-hover)]"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[var(--fg-subtle)] transition-colors group-hover:text-accent" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                        {label}
                      </span>
                      <span className="block truncate text-[14px]">{value}</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--fg-subtle)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}

              <li className="-mx-3 flex items-center gap-4 px-3 py-3.5">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--fg-subtle)]" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                    Location
                  </span>
                  <span className="block text-[14px]">{SITE.location}</span>
                </span>
              </li>
            </ul>

            <div className="mt-auto flex items-center gap-2.5 border-t border-[var(--line)] pt-6">
              <span
                aria-hidden
                className="relative flex h-2 w-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="text-[13px] text-muted">
                Available for internships
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
