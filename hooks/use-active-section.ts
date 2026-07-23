"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/constants/site";

/**
 * Scroll-spy over the page sections. One IntersectionObserver with a band
 * across the upper third of the viewport, so a section becomes "active" as
 * its heading reaches reading position rather than the moment it enters.
 */
export function useActiveSection(ids: readonly SectionId[]) {
  const [active, setActive] = useState<SectionId>(ids[0]);

  useEffect(() => {
    const seen = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target.id, entry.intersectionRatio);
        }
        let best: SectionId = ids[0];
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = seen.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (bestRatio > 0) setActive(best);
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6, 1] },
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
