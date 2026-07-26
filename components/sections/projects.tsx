import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { getProjects } from "@/lib/github";

/**
 * Server component. The project list is generated from the live GitHub repo
 * list at request time (hourly revalidation), so a newly deployed project
 * appears here on its own — no code change. If GitHub is unreachable it falls
 * back to the curated list. The interactive filtering/animation lives in the
 * client ProjectsGallery.
 */
export async function Projects() {
  const projects = await getProjects();

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I have shipped."
        lede="Pulled live from GitHub — real-time platforms, AI products, and systems, built end to end."
      />
      <ProjectsGallery projects={projects} />
    </section>
  );
}
