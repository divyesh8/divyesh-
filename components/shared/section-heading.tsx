import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/motion";

/**
 * Every section opens the same way: a mono eyebrow, a display heading, and
 * a hairline terminating in an accent node — the topology motif from the
 * hero, reused as structural punctuation.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-14 md:mb-20", className)}>
      <Reveal>
        <p className="eyebrow mb-5">{eyebrow}</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
            {lede}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.16}>
        <div className="hairline-node mt-10 w-full max-w-lg" />
      </Reveal>
    </header>
  );
}
