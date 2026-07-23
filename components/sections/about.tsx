import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Reveal } from "@/components/shared/motion";
import { ABOUT } from "@/constants/content";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        eyebrow="About"
        title="Turning ideas into products that solve real problems."
        lede={ABOUT.paragraph}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {/* Facts table — the resume, compressed. */}
        <Reveal className="md:col-span-2">
          <SpotlightCard className="h-full p-7 sm:p-9">
            <p className="eyebrow mb-7">Details</p>
            <dl className="divide-y divide-[var(--line)]">
              {ABOUT.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 py-3.5 first:pt-0 last:pb-0"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                    {fact.label}
                  </dt>
                  <dd className="text-right text-[15px] font-medium">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>
        </Reveal>

        {/* Spoken languages */}
        <Reveal delay={0.08}>
          <SpotlightCard className="h-full p-7 sm:p-9">
            <p className="eyebrow mb-7">Languages</p>
            <ul className="space-y-4">
              {ABOUT.languages.map((lang) => (
                <li key={lang.name}>
                  <p className="text-[15px] font-medium">{lang.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">
                    {lang.level}
                  </p>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>

        {/* Interests */}
        <Reveal delay={0.12} className="md:col-span-3">
          <SpotlightCard className="p-7 sm:p-9">
            <p className="eyebrow mb-6">Interests</p>
            <ul className="flex flex-wrap gap-2.5">
              {ABOUT.interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-muted transition-colors duration-300 hover:border-accent/40 hover:text-[var(--fg)]"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
