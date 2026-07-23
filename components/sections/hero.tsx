"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/motion";
import { Topology } from "@/components/shared/topology";
import { TypingText } from "@/components/shared/typing-text";
import { HERO } from "@/constants/content";
import { SITE } from "@/constants/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Orchestrated entrance: the page arrives in one sequence, not in pieces. */
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.09, ease: EASE },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 sm:pt-36"
    >
      {/* Substrate — the grid the whole identity is built on. */}
      <div
        aria-hidden
        className="grid-substrate mask-fade-b absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: "var(--color-accent-dim)" }}
      />

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---------------- Left: the claim ---------------- */}
          <div>
            <motion.p
              custom={0}
              variants={rise}
              initial="hidden"
              animate="show"
              className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent-glow)]"
              />
              B.Tech Cloud Computing
              <span aria-hidden className="text-[var(--line-strong)]">
                /
              </span>
              SRM Chennai
              <span aria-hidden className="text-[var(--line-strong)]">
                /
              </span>
              Class of 2029
            </motion.p>

            <h1 className="font-display text-[clamp(3rem,11vw,7rem)] font-semibold leading-[0.86] tracking-[-0.045em]">
              <motion.span
                custom={1}
                variants={rise}
                initial="hidden"
                animate="show"
                className="block"
              >
                DIVYESH
              </motion.span>
              <motion.span
                custom={2}
                variants={rise}
                initial="hidden"
                animate="show"
                className="block text-[var(--fg-subtle)]"
              >
                KOLLI
              </motion.span>
            </h1>

            {/* Roles cycle in mono — the metadata line under the name. */}
            <motion.p
              custom={3}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 font-mono text-sm tracking-[0.02em] text-[var(--fg)] sm:text-base"
            >
              <TypingText words={HERO.roles} />
            </motion.p>

            <motion.p
              custom={4}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 max-w-xl text-[15px] leading-[1.75] text-muted sm:text-base"
            >
              {HERO.intro}
            </motion.p>

            <motion.div
              custom={5}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button asChild size="lg">
                  <a href="#work">
                    View projects
                    <ArrowUpRight />
                  </a>
                </Button>
              </Magnetic>

              <Magnetic>
                <Button asChild variant="outline" size="lg">
                  <a href={SITE.resumePath} download>
                    Download resume
                    <FileDown />
                  </a>
                </Button>
              </Magnetic>

              <Magnetic>
                <Button asChild variant="ghost" size="lg">
                  <a href="#contact">
                    Contact
                    <Mail />
                  </a>
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* ---------------- Right: the system ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
            className="relative flex justify-center lg:justify-end"
          >
            <Topology />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 hidden items-center gap-3 text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)] lg:inline-flex"
        >
          <span className="eyebrow">Scroll</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
