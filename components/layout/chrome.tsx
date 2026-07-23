"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useFinePointer, useReducedMotion } from "@/hooks/use-media-query";

/* ------------------------------------------------------------------
   ScrollProgress — a 2px accent rule pinned to the top of the viewport.
   ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
    />
  );
}

/* ------------------------------------------------------------------
   Noise — a single tiled SVG grain over the whole page. Kills banding
   on the large dark fields and gives the black some material.
   ------------------------------------------------------------------ */

const NOISE_URI =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>";

export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] opacity-[0.035] mix-blend-soft-light"
      style={{ backgroundImage: `url("${NOISE_URI}")` }}
    />
  );
}

/* ------------------------------------------------------------------
   CustomCursor — a small dot plus a ring that lags behind it and
   expands over interactive targets. Only mounts on fine pointers, and
   never when reduced motion is requested.
   ------------------------------------------------------------------ */

export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    document.body.dataset.cursor = "on";

    const pos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let frame = 0;

    function onMove(event: PointerEvent) {
      pos.x = event.clientX;
      pos.y = event.clientY;
      setVisible(true);

      const el = (event.target as HTMLElement)?.closest?.(
        'a, button, [role="button"], input, textarea, [data-cursor="hover"]',
      );
      setActive(Boolean(el));
    }

    function render() {
      // The dot is exact; the ring eases toward it for weight.
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      delete document.body.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent transition-[width,height] duration-300"
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 rounded-full border border-[var(--fg-subtle)] transition-[width,height,border-color,background-color] duration-300 ease-[var(--ease-out-quint)]"
        style={{
          width: active ? 46 : 26,
          height: active ? 46 : 26,
          borderColor: active ? "#4F8CFF" : "var(--fg-subtle)",
          backgroundColor: active ? "rgba(79,140,255,0.08)" : "transparent",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   BackToTop — appears once the hero is behind you.
   ------------------------------------------------------------------ */

export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShown(window.scrollY > window.innerHeight * 1.2);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {shown ? (
        <motion.a
          href="#hero"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-elevated)]/80 text-[var(--fg-muted)] backdrop-blur-xl transition-colors duration-300 hover:border-accent hover:text-[var(--fg)]"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
