"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

/**
 * Types through a list of roles and holds each one. Under reduced motion it
 * renders the roles as static text instead, so nothing is hidden.
 */
export function TypingText({
  words,
  typeMs = 55,
  deleteMs = 28,
  holdMs = 1900,
  className,
}: {
  words: readonly string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const word = words[index % words.length];

    if (!deleting && text === word) {
      const hold = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const next = deleting
      ? word.slice(0, text.length - 1)
      : word.slice(0, text.length + 1);

    const timer = setTimeout(() => setText(next), deleting ? deleteMs : typeMs);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs, reduced]);

  if (reduced) {
    return <span className={className}>{words.join(" · ")}</span>;
  }

  return (
    <span className={className}>
      <span aria-live="polite">{text}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-accent animate-caret"
      />
    </span>
  );
}
