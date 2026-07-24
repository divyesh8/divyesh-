"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { stagger, staggerItem } from "@/components/shared/motion";
import { SOCIALS } from "@/constants/site";
import { cn } from "@/lib/utils";

type Profile = {
  name: string;
  handle: string;
  href: string | null;
  Icon: LucideIcon;
};

const PROFILES: Profile[] = [
  { name: "GitHub", handle: "@divyesh8", href: SOCIALS.github, Icon: Github },
  {
    name: "LinkedIn",
    handle: "Divyesh Kolli",
    href: SOCIALS.linkedin,
    Icon: Linkedin,
  },
  {
    name: "LeetCode",
    handle: "@_divyesshh",
    href: SOCIALS.leetcode,
    Icon: Code2,
  },
  {
    name: "Instagram",
    handle: "@_divyesshh",
    href: SOCIALS.instagram,
    Icon: Instagram,
  },
];

export function Profiles() {
  return (
    <section id="profiles" className="relative mx-auto max-w-6xl px-6 pb-28 md:pb-40">
      <SectionHeading eyebrow="Elsewhere" title="Find me on the internet." />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PROFILES.map(({ name, handle, href, Icon }) => {
          const disabled = !href;

          const inner = (
            <>
              <div className="flex items-start justify-between">
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    disabled
                      ? "text-[var(--fg-subtle)]"
                      : "text-[var(--fg-muted)] group-hover:text-accent",
                  )}
                />
                {!disabled ? (
                  <ArrowUpRight className="h-4 w-4 -translate-y-0.5 translate-x-0.5 text-[var(--fg-subtle)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                ) : null}
              </div>

              <div className="mt-12">
                <p className="text-[15px] font-medium">{name}</p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.06em] text-subtle">
                  {handle}
                </p>
              </div>
            </>
          );

          const className = cn(
            "flex h-full flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6",
            "transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[var(--ease-out-quint)]",
            disabled
              ? "cursor-default opacity-45"
              : "group hover:-translate-y-1 hover:border-[var(--line-strong)] hover:bg-[var(--panel-hover)] hover:shadow-lift",
          );

          return (
            <motion.li key={name} variants={staggerItem}>
              {disabled ? (
                <div className={className} aria-disabled="true">
                  {inner}
                </div>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
