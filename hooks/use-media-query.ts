"use client";

import { useEffect, useState } from "react";

/** Subscribe to a media query. Returns false during SSR and first paint. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the visitor has asked the OS to reduce motion. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on devices with a precise pointer, where a custom cursor makes sense. */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
