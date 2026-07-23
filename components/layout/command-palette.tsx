"use client";

import { useCallback, useEffect } from "react";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Contact,
  FileDown,
  Github,
  Linkedin,
  Moon,
  Code2,
  Sun,
} from "lucide-react";
import { NAV, SITE, SOCIALS } from "@/constants/site";
import { useTheme } from "@/hooks/use-theme";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

/**
 * Ctrl/Cmd+K palette. Navigation, links, resume and theme in one surface —
 * the keyboard path through the whole site.
 */
export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { theme, toggle } = useTheme();

  useKeyboardShortcut("k", () => onOpenChange(!open), { meta: true });

  // Lock the page behind the dialog.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  const go = useCallback(
    (action: () => void) => {
      onOpenChange(false);
      // Let the dialog unmount before scrolling or navigating.
      requestAnimationFrame(action);
    },
    [onOpenChange],
  );

  const scrollTo = (id: string) =>
    go(() =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );

  const openLink = (href: string) =>
    go(() => window.open(href, "_blank", "noopener,noreferrer"));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      className="fixed inset-0 z-[80]"
      overlayClassName="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in"
      contentClassName="fixed left-1/2 top-[18%] z-[81] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--bg-elevated)] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center gap-3 border-b border-[var(--line)] px-4">
        <Command.Input
          placeholder="Jump to a section, open a profile…"
          className="h-14 w-full bg-transparent text-[15px] text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)]"
        />
        <kbd className="hidden shrink-0 rounded border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--fg-subtle)] sm:block">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[52vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-subtle">
          Nothing matches that.
        </Command.Empty>

        <Command.Group heading="Go to" className="cmd-group">
          {NAV.map((item) => (
            <Item key={item.id} onSelect={() => scrollTo(item.id)}>
              <Code2 className="h-4 w-4 text-[var(--fg-subtle)]" />
              {item.label}
            </Item>
          ))}
          <Item onSelect={() => scrollTo("resume")}>
            <Contact className="h-4 w-4 text-[var(--fg-subtle)]" />
            Resume
          </Item>
        </Command.Group>

        <Command.Group heading="Links" className="cmd-group">
          <Item onSelect={() => openLink(SOCIALS.github)}>
            <Github className="h-4 w-4 text-[var(--fg-subtle)]" />
            GitHub
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-[var(--fg-subtle)]" />
          </Item>
          <Item onSelect={() => openLink(SOCIALS.linkedin)}>
            <Linkedin className="h-4 w-4 text-[var(--fg-subtle)]" />
            LinkedIn
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-[var(--fg-subtle)]" />
          </Item>
          <Item onSelect={() => openLink(SOCIALS.leetcode)}>
            <Code2 className="h-4 w-4 text-[var(--fg-subtle)]" />
            LeetCode
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-[var(--fg-subtle)]" />
          </Item>
          <Item onSelect={() => openLink(`mailto:${SITE.email}`)}>
            <Contact className="h-4 w-4 text-[var(--fg-subtle)]" />
            Email {SITE.email}
          </Item>
        </Command.Group>

        <Command.Group heading="Actions" className="cmd-group">
          <Item onSelect={() => go(() => window.open(SITE.resumePath, "_blank"))}>
            <FileDown className="h-4 w-4 text-[var(--fg-subtle)]" />
            Download resume
          </Item>
          <Item onSelect={() => go(toggle)}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-[var(--fg-subtle)]" />
            ) : (
              <Moon className="h-4 w-4 text-[var(--fg-subtle)]" />
            )}
            Switch to {theme === "dark" ? "light" : "dark"} theme
          </Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Item({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--fg-muted)] transition-colors data-[selected=true]:bg-[var(--panel)] data-[selected=true]:text-[var(--fg)]"
    >
      {children}
    </Command.Item>
  );
}
