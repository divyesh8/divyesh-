import dynamic from "next/dynamic";
import { Preloader } from "@/components/layout/preloader";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Journey } from "@/components/sections/journey";
import { GitHubSection } from "@/components/sections/github";
import { Profiles } from "@/components/sections/profiles";

/* Below-the-fold client sections load on demand — they never block the
   hero from painting. */
const Resume = dynamic(() =>
  import("@/components/sections/resume").then((m) => m.Resume),
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.Contact),
);

export default function HomePage() {
  return (
    <>
      <Preloader />
      <SiteChrome />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <GitHubSection />
        <Profiles />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
