"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Reveal, stagger, staggerItem } from "@/components/shared/motion";
import { CONCEPTS, SKILL_GROUPS } from "@/constants/content";

/**
 * Skill groups as cards. No progress bars — a self-assigned "85% at React"
 * tells a recruiter nothing. The grouping itself is the information.
 */
export function Skills() {
  return (
    <section
      id="skills"
      className="relative border-y border-[var(--line)] bg-[var(--bg-elevated)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <SectionHeading
          eyebrow="Skills"
          title="The stack I build with."
          lede="Grouped by where each piece sits in a system, from the language up to the model."
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_GROUPS.map((group, i) => (
            <motion.li key={group.title} variants={staggerItem}>
              <SpotlightCard className="h-full p-7">
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                    {String(i + 1).padStart(2, "0")} {group.caption}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-[var(--line)] bg-[var(--bg)]/40 px-2.5 py-1.5 text-[13px] text-muted transition-colors duration-300 group-hover:border-[var(--line-strong)] group-hover:text-[var(--fg)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.li>
          ))}
        </motion.ul>

        {/* Fundamentals, set as a quiet mono strip rather than another card. */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--line)] pt-8">
            <span className="eyebrow mr-2">Fundamentals</span>
            {CONCEPTS.map((concept, i) => (
              <span key={concept} className="text-[13px] text-muted">
                {concept}
                {i < CONCEPTS.length - 1 ? (
                  <span aria-hidden className="ml-3 text-[var(--line-strong)]">
                    /
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
