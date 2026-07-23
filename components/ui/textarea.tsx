import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[15px] leading-relaxed text-[var(--fg)]",
      "placeholder:text-[var(--fg-subtle)]",
      "transition-colors duration-300 ease-[var(--ease-out-quint)]",
      "hover:border-[var(--line-strong)] focus:border-accent focus:bg-[var(--panel-hover)]",
      "aria-[invalid=true]:border-red-400/60",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
