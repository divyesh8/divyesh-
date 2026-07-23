import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Reveal } from "@/components/shared/motion";
import { Badge } from "@/components/ui/badge";
import { getGitHubStats } from "@/lib/github";
import { SOCIALS } from "@/constants/site";
import { formatMonthYear } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Server component — everything here is fetched from the GitHub API at
 * request time with hourly revalidation, so the numbers are never stale
 * and never shipped as JS. If GitHub is unreachable the section degrades
 * to a single link rather than taking the page down.
 */
export async function GitHubSection() {
  let stats: Awaited<ReturnType<typeof getGitHubStats>> | null = null;

  try {
    stats = await getGitHubStats();
  } catch {
    stats = null;
  }

  return (
    <section id="github" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        eyebrow="GitHub"
        title="What I have been building."
        lede="Pulled live from the GitHub API."
      />

      {!stats ? (
        <Reveal>
          <SpotlightCard className="p-9">
            <p className="text-[15px] text-muted">
              GitHub stats could not be loaded right now.{" "}
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                Visit the profile directly
              </a>
              .
            </p>
          </SpotlightCard>
        </Reveal>
      ) : (
        <>
          {/* Stat row */}
          <Reveal>
            <ul className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Repositories", value: stats.profile.publicRepos },
                { label: "Followers", value: stats.profile.followers },
                { label: "Stars earned", value: stats.totalStars },
                {
                  label: "On GitHub since",
                  value: formatMonthYear(stats.profile.createdAt),
                },
              ].map((stat) => (
                <li key={stat.label}>
                  <SpotlightCard className="h-full p-6">
                    <p className="font-display text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="eyebrow mt-2">{stat.label}</p>
                  </SpotlightCard>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Contribution calendar */}
          <Reveal delay={0.06}>
            <SpotlightCard className="mb-4 p-6 sm:p-8">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="eyebrow">Contribution activity</p>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-medium text-[var(--fg)]">
                      {stats.calendar.total.toLocaleString()}
                    </span>{" "}
                    contributions · {stats.calendar.windowLabel}
                  </p>
                </div>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle transition-colors hover:text-[var(--fg)]"
                >
                  @{stats.profile.login}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              {/* Grid flows top-to-bottom in columns of 7, like GitHub's own. */}
              <div className="overflow-x-auto pb-1">
                <div
                  className="grid grid-flow-col grid-rows-7 gap-[3px]"
                  style={{ gridAutoColumns: "minmax(9px, 1fr)" }}
                >
                  {stats.calendar.days.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.count} on ${day.date}`}
                      className={cn(
                        "aspect-square rounded-[2px] transition-colors",
                        day.level === 0 && "bg-[var(--panel)]",
                        day.level === 1 && "bg-accent/25",
                        day.level === 2 && "bg-accent/45",
                        day.level === 3 && "bg-accent/70",
                        day.level === 4 && "bg-accent",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                {!stats.calendar.authoritative ? (
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-subtle">
                    Public events feed
                  </p>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-subtle">
                    Less
                  </span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={cn(
                        "h-2.5 w-2.5 rounded-[2px]",
                        level === 0 && "bg-[var(--panel)]",
                        level === 1 && "bg-accent/25",
                        level === 2 && "bg-accent/45",
                        level === 3 && "bg-accent/70",
                        level === 4 && "bg-accent",
                      )}
                    />
                  ))}
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-subtle">
                    More
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Languages */}
            <Reveal delay={0.1}>
              <SpotlightCard className="h-full p-6 sm:p-8">
                <p className="eyebrow mb-6">Top languages</p>
                {stats.languages.length ? (
                  <ul className="space-y-4">
                    {stats.languages.map((lang) => (
                      <li key={lang.name}>
                        <div className="mb-2 flex items-baseline justify-between gap-4">
                          <span className="text-sm font-medium">{lang.name}</span>
                          <span className="font-mono text-[11px] tabular-nums text-subtle">
                            {lang.percent}%
                          </span>
                        </div>
                        <div className="h-[3px] w-full overflow-hidden rounded-full bg-[var(--panel)]">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${lang.percent}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted">No public repositories yet.</p>
                )}
              </SpotlightCard>
            </Reveal>

            {/* Recent repositories */}
            <Reveal delay={0.14}>
              <SpotlightCard className="h-full p-6 sm:p-8">
                <p className="eyebrow mb-6">Recently pushed</p>
                {stats.repos.length ? (
                  <ul className="divide-y divide-[var(--line)]">
                    {stats.repos.map((repo) => (
                      <li key={repo.name} className="py-4 first:pt-0 last:pb-0">
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/repo block"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-mono text-sm font-medium transition-colors group-hover/repo:text-accent">
                              {repo.name}
                            </span>
                            <span className="flex shrink-0 items-center gap-3 font-mono text-[11px] tabular-nums text-subtle">
                              {repo.stars > 0 ? (
                                <span className="inline-flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  {repo.stars}
                                </span>
                              ) : null}
                              {repo.forks > 0 ? (
                                <span className="inline-flex items-center gap-1">
                                  <GitFork className="h-3 w-3" />
                                  {repo.forks}
                                </span>
                              ) : null}
                            </span>
                          </div>
                          {repo.description ? (
                            <p className="mt-1.5 line-clamp-1 text-[13px] text-muted">
                              {repo.description}
                            </p>
                          ) : null}
                          <div className="mt-2.5 flex items-center gap-2">
                            {repo.language ? <Badge>{repo.language}</Badge> : null}
                            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-subtle">
                              {formatMonthYear(repo.pushedAt)}
                            </span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted">No public repositories yet.</p>
                )}
              </SpotlightCard>
            </Reveal>
          </div>
        </>
      )}
    </section>
  );
}
