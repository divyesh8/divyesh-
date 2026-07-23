"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/constants/site";
import { useReducedMotion } from "@/hooks/use-media-query";

/**
 * Loading screen. Counts to 100 and lifts away as a single panel.
 * Deliberately short — a portfolio that makes a recruiter wait is a
 * portfolio that loses the recruiter. Skipped entirely under reduced
 * motion and on repeat visits within a session.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("dk-preloaded") === "1";
    if (seen || reduced) {
      setDone(true);
      setReady(true);
      return;
    }
    setReady(true);

    document.documentElement.classList.add("lenis-stopped");

    const start = performance.now();
    const DURATION = 1150;
    let frame = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / DURATION);
      // Ease out so the last digits settle rather than snap.
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("dk-preloaded", "1");
        setDone(true);
      }
    }
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  useEffect(() => {
    if (done) document.documentElement.classList.remove("lenis-stopped");
  }, [done]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-[var(--bg)] px-6 pb-10 sm:px-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow mb-3">{SITE.location}</p>
              <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {SITE.name}
              </p>
            </div>
            <p className="font-mono text-5xl font-medium tabular-nums tracking-tighter sm:text-7xl">
              {count}
            </p>
          </div>

          {/* The load itself, drawn as a rule. */}
          <div className="mt-6 h-px w-full bg-[var(--line)]">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
