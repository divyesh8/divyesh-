import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 text-[15px] text-[var(--fg)]",
      "placeholder:text-[var(--fg-subtle)]",
      "transition-colors duration-300 ease-[var(--ease-out-quint)]",
      "hover:border-[var(--line-strong)] focus:border-accent focus:bg-[var(--panel-hover)]",
      "aria-[invalid=true]:border-red-400/60",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
