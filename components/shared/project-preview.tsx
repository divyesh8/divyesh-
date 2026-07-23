"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";
import type { Project } from "@/constants/content";

/**
 * Generated artwork for each project card. A real screenshot is better when
 * one exists — drop an image at /projects/<slug>.png and it takes over. Until
 * then this draws a motif specific to what the project does, which beats a
 * grey placeholder box and stays on-palette.
 *
 * GSAP drives a slow parallax drift on the artwork as the card moves through
 * the viewport — the one place in the build where a scroll-linked timeline
 * earns its bundle cost over Framer's declarative API.
 */
export function ProjectPreview({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    let ctx: { revert: () => void } | undefined;

    // Loaded on demand so GSAP never lands in the initial bundle.
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)]">
      <div className="grid-substrate absolute inset-0 opacity-80" />
      <div ref={ref} className="absolute inset-0 scale-110">
        <Motif project={project} />
      </div>

      {/* Chrome bar — reads as an app window without faking a screenshot. */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-[var(--line)] bg-[var(--bg)]/70 px-3 py-2 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--line-strong)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--line-strong)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--line-strong)]" />
        <span className="ml-2 truncate font-mono text-[9px] uppercase tracking-[0.14em] text-subtle">
          {project.href
            ? project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : project.slug}
        </span>
      </div>
    </div>
  );
}

function Motif({ project }: { project: Project }) {
  const accent = "#4F8CFF";

  if (project.motif === "arena") {
    // Two opposing clusters with a judge above — the battle loop.
    return (
      <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
        <circle cx="80" cy="22" r="7" fill="none" stroke={accent} strokeWidth="0.6" />
        <circle cx="80" cy="22" r="2" fill={accent} />
        {[36, 124].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="66" r="12" fill="none" stroke="var(--line-strong)" strokeWidth="0.6" />
            <circle cx={cx} cy="66" r="3" fill="var(--fg-muted)" />
            <path d={`M ${cx} 54 L 80 29`} stroke="var(--line-strong)" strokeWidth="0.5" fill="none" />
          </g>
        ))}
        <path d="M 48 66 L 112 66" stroke={accent} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.7" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={30 + i * 26} y="84" width="18" height="2" rx="1" fill="var(--line-strong)" />
        ))}
      </svg>
    );
  }

  if (project.motif === "fitness") {
    // A progress curve over a measurement grid.
    return (
      <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
        {[26, 44, 62, 80].map((y) => (
          <line key={y} x1="18" y1={y} x2="142" y2={y} stroke="var(--line)" strokeWidth="0.5" />
        ))}
        <path
          d="M 18 78 C 44 74, 56 58, 74 52 S 108 40, 142 24"
          fill="none"
          stroke={accent}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {[
          [18, 78],
          [74, 52],
          [142, 24],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="2.2" fill="var(--bg)" stroke={accent} strokeWidth="0.8" />
        ))}
        {[30, 46, 62].map((x, i) => (
          <rect key={x} x={x} y={88 - i * 2} width="8" height={4 + i * 2} rx="1" fill="var(--line-strong)" />
        ))}
      </svg>
    );
  }

  // bots — a scheduler fanning out to autonomous agents.
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full">
      <rect x="70" y="16" width="20" height="14" rx="3" fill="none" stroke={accent} strokeWidth="0.7" />
      <circle cx="80" cy="23" r="2" fill={accent} />
      {[28, 60, 100, 132].map((cx) => (
        <g key={cx}>
          <path d={`M 80 32 C 80 52, ${cx} 52, ${cx} 66`} fill="none" stroke="var(--line-strong)" strokeWidth="0.5" />
          <rect x={cx - 7} y="68" width="14" height="12" rx="3" fill="none" stroke="var(--line-strong)" strokeWidth="0.6" />
          <circle cx={cx} cy="74" r="1.6" fill="var(--fg-muted)" />
        </g>
      ))}
    </svg>
  );
}
