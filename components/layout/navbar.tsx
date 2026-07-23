"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Command, Menu, Moon, Sun, X } from "lucide-react";
import { NAV, SECTION_IDS, SITE } from "@/constants/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

/**
 * Floating glass navigation. The active pill is a shared layoutId, so the
 * highlight slides between links instead of cutting. Below md the links
 * collapse into a sheet.
 */
export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on Escape, and lock scrolling while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.documentElement.classList.add("lenis-stopped");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "flex w-full max-w-4xl items-center gap-2 rounded-full border px-2 py-2 transition-all duration-500 ease-[var(--ease-out-quint)] sm:gap-3 sm:px-3",
          scrolled || menuOpen
            ? "border-[var(--line)] bg-[var(--bg)]/72 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
            : "border-transparent bg-transparent",
        )}
      >
        {/* Wordmark */}
        <a
          href="#hero"
          onClick={() => setMenuOpen(false)}
          className="ml-1 mr-auto flex shrink-0 items-center gap-2 rounded-full px-2 py-1"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent-glow)]"
          />
          <span className="font-mono text-xs font-medium tracking-[0.08em]">
            {SITE.handle}
          </span>
          <span className="sr-only">{SITE.name} — back to top</span>
        </a>

        {/* Links — desktop */}
        <ul className="hidden items-center md:flex">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300",
                    isActive
                      ? "text-[var(--fg)]"
                      : "text-[var(--fg-subtle)] hover:text-[var(--fg)]",
                  )}
                >
                  {item.label}
                </a>
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[var(--panel)] ring-1 ring-[var(--line)]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden h-9 items-center gap-2 rounded-full border border-[var(--line)] px-3 text-[var(--fg-subtle)] transition-colors duration-300 hover:border-[var(--line-strong)] hover:text-[var(--fg)] sm:flex"
          >
            <Command className="h-3.5 w-3.5" />
            <kbd className="font-mono text-[10px] tracking-[0.08em]">K</kbd>
          </button>

          <a
            href={SITE.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-4 text-[13px] text-[var(--fg)] transition-colors duration-300 hover:border-accent hover:text-accent lg:flex"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={toggle}
            aria-label={
              mounted && theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--fg-subtle)] transition-colors duration-300 hover:border-[var(--line-strong)] hover:text-[var(--fg)]"
          >
            {mounted && theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Menu trigger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--fg-subtle)] transition-colors duration-300 hover:border-[var(--line-strong)] hover:text-[var(--fg)] md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Sheet — mobile only */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-4 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)]/92 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:hidden"
          >
            <ul>
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-[15px] transition-colors duration-200",
                      active === item.id
                        ? "bg-[var(--panel)] text-[var(--fg)]"
                        : "text-[var(--fg-muted)] hover:bg-[var(--panel)] hover:text-[var(--fg)]",
                    )}
                  >
                    {item.label}
                    {active === item.id ? (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                    ) : null}
                  </a>
                </li>
              ))}
              <li className="mt-1 border-t border-[var(--line)] pt-1">
                <a
                  href={SITE.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:bg-[var(--panel)] hover:text-[var(--fg)]"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Resume
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenPalette();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:bg-[var(--panel)] hover:text-[var(--fg)]"
                >
                  <Command className="h-4 w-4" />
                  Search
                </button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
