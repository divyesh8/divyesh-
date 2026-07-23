"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { JOURNEY } from "@/constants/content";
import { cn } from "@/lib/utils";

/**
 * Timeline. Years are genuine sequence here, so they carry the structure —
 * the spine fills as you scroll, and each node lights when its entry lands.
 */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      className="relative border-y border-[var(--line)] bg-[var(--bg-elevated)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <SectionHeading
          eyebrow="Journey"
          title="How I got here, and where it goes."
        />

        <ol ref={ref} className="relative ml-1 max-w-2xl">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--line)]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
          />

          {JOURNEY.map((entry, i) => (
            <motion.li
              key={`${entry.year}-${entry.title}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-12 pl-10 last:pb-0"
            >
              {/* Node */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-[5px] flex h-[15px] w-[15px] items-center justify-center rounded-full border",
                  entry.status === "future"
                    ? "border-dashed border-[var(--line-strong)] bg-[var(--bg-elevated)]"
                    : "border-[var(--line-strong)] bg-[var(--bg-elevated)]",
                )}
              >
                <span
                  className={cn(
                    "h-[5px] w-[5px] rounded-full",
                    entry.status === "active"
                      ? "bg-accent shadow-[0_0_10px_var(--color-accent-glow)]"
                      : entry.status === "done"
                        ? "bg-[var(--fg-muted)]"
                        : "bg-transparent",
                  )}
                />
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                  {entry.year}
                </span>
                {entry.status === "active" ? (
                  <span className="rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                    In progress
                  </span>
                ) : null}
              </div>

              <h3 className="mt-2 text-lg font-semibold sm:text-xl">
                {entry.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {entry.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
