"use client";

import { useState } from "react";
import { ExternalLink, FileDown, FileText } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Magnetic } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { CERTIFICATIONS } from "@/constants/content";
import { SITE } from "@/constants/site";

/**
 * Resume preview. The embedded viewer is a native <object>, which means no
 * PDF.js payload and no work at all until the visitor scrolls here. If the
 * file is missing, the fallback content inside <object> renders instead.
 */
export function Resume() {
  const [failed, setFailed] = useState(false);

  return (
    <section
      id="resume"
      className="relative border-y border-[var(--line)] bg-[var(--bg-elevated)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <SectionHeading
          eyebrow="Resume"
          title="The one-page version."
          lede="Same story, formatted for an ATS."
        />

        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Viewer */}
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)]">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                  <FileText className="h-3.5 w-3.5" />
                  Divyesh-Kolli-Resume.pdf
                </span>
                <a
                  href={SITE.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle transition-colors hover:text-[var(--fg)]"
                >
                  Open
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {!failed ? (
                <object
                  data={`${SITE.resumePath}#toolbar=0&navpanes=0&view=FitH`}
                  type="application/pdf"
                  className="h-[560px] w-full bg-[var(--bg)] sm:h-[680px]"
                  aria-label="Resume preview"
                  onError={() => setFailed(true)}
                >
                  <ResumeFallback />
                </object>
              ) : (
                <ResumeFallback />
              )}
            </div>
          </Reveal>

          {/* Certifications + download */}
          <div className="space-y-4">
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-7">
                <p className="eyebrow mb-6">Certifications</p>
                <ul className="space-y-4">
                  {CERTIFICATIONS.map((cert) => (
                    <li
                      key={cert}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-7">
                <p className="text-[15px] leading-relaxed text-muted">
                  Prefer a copy for your records?
                </p>
                <Magnetic className="mt-5">
                  <Button asChild size="md">
                    <a href={SITE.resumePath} download>
                      Download resume
                      <FileDown />
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeFallback() {
  return (
    <div className="flex h-[360px] flex-col items-center justify-center gap-4 px-6 text-center">
      <FileText className="h-7 w-7 text-[var(--fg-subtle)]" />
      <p className="max-w-sm text-[14px] leading-relaxed text-muted">
        Your browser cannot display the PDF inline.
      </p>
      <Button asChild variant="outline" size="sm">
        <a href={SITE.resumePath} download>
          Download instead
          <FileDown />
        </a>
      </Button>
    </div>
  );
}
