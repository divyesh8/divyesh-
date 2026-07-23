import * as React from "react";
import { cn } from "@/lib/utils";

/** Small mono chip used for tech stacks, languages and metadata. */
export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[var(--line)] bg-[var(--panel)] px-2 py-1",
        "font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--fg-muted)]",
        "transition-colors duration-300 ease-[var(--ease-out-quint)]",
        className,
      )}
      {...props}
    />
  );
}
