"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectPreview } from "@/components/shared/project-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/motion";
import { PROJECTS, PROJECT_FILTERS } from "@/constants/content";
import { cn } from "@/lib/utils";

type FilterId = (typeof PROJECT_FILTERS)[number]["id"];

export function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(filter as "ai" | "web" | "product")),
    [filter],
  );

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I have shipped."
        lede="Real-time platforms and AI products, built end to end — interface, API, data, and the model in between."
      />

      {/* Filters */}
      <div
        role="tablist"
        aria-label="Filter projects"
        className="mb-10 flex flex-wrap gap-2"
      >
        {PROJECT_FILTERS.map((chip) => {
          const isActive = filter === chip.id;
          return (
            <button
              key={chip.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(chip.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-[13px] transition-colors duration-300",
                isActive
                  ? "text-[var(--fg)]"
                  : "text-[var(--fg-subtle)] hover:text-[var(--fg)]",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="filter-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-[var(--line-strong)] bg-[var(--panel)]"
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              ) : null}
              <span className="relative">{chip.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="space-y-6">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.article
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-lift"
            >
              <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12">
                {/* Copy */}
                <div className="order-2 lg:order-1">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                      {project.kind}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]",
                        project.status === "Live"
                          ? "border-accent/30 text-accent"
                          : "border-[var(--line)] text-subtle",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1 w-1 rounded-full",
                          project.status === "Live"
                            ? "bg-accent"
                            : "bg-[var(--fg-subtle)]",
                        )}
                      />
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[13px] text-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.href ? (
                      <Magnetic>
                        <Button asChild size="sm">
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit project
                            <ArrowUpRight />
                          </a>
                        </Button>
                      </Magnetic>
                    ) : null}

                    {project.repo ? (
                      <Magnetic>
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github />
                            GitHub
                          </a>
                        </Button>
                      </Magnetic>
                    ) : null}
                  </div>
                </div>

                {/* Preview */}
                <div className="order-1 lg:order-2">
                  <ProjectPreview project={project} />
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
