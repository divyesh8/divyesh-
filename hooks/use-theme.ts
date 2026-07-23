"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const STORAGE_KEY = "dk-theme";

/**
 * Theme state backed by `data-theme` on <html>. Dark is the default; the
 * inline script in app/layout.tsx sets the attribute before first paint,
 * so this hook only reads what is already there and never flashes.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const apply = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode — the theme still applies for this session.
    }
    setTheme(next);
  }, []);

  // Read the current theme off the element rather than closure state, so
  // rapid successive toggles never act on a stale render.
  const toggle = useCallback(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined;
    apply(current === "light" ? "dark" : "light");
  }, [apply]);

  return { theme, toggle, mounted };
}
