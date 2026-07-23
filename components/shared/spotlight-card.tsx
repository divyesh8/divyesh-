"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card that lifts on hover and carries a dim accent spotlight tracking the
 * pointer. The glow is a single low-alpha radial — no neon, no gradient
 * fill. Pointer position is written straight to CSS custom properties so
 * tracking never triggers a React render.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    el.style.setProperty("--spot-opacity", "1");
  }

  function onPointerLeave() {
    ref.current?.style.setProperty("--spot-opacity", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]",
        "transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[var(--ease-out-quint)]",
        "hover:-translate-y-1 hover:border-[var(--line-strong)] hover:bg-[var(--panel-hover)] hover:shadow-lift",
        className,
      )}
      style={{ "--spot-opacity": 0 } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--spot-opacity)] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(340px circle at var(--spot-x) var(--spot-y), var(--color-accent-dim), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
