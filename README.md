# Divyesh Kolli — Portfolio

Personal portfolio built with Next.js 15 (App Router), TypeScript, Tailwind
CSS v4, Framer Motion, Lenis and GSAP.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Before you deploy

Three things need your input. The site runs without them, but it is not
finished until they are done.

**1. Add your resume PDF.** Drop it at `public/Divyesh-Kolli-Resume.pdf`.
The Resume section embeds it and both Download buttons point at it. Until
the file exists the viewer shows a fallback with a download link.

**2. Add a GitHub token.** Copy `.env.example` to `.env.local` and set
`GITHUB_TOKEN`. Without one you are capped at 60 API requests/hour per IP
and the contribution calendar falls back to a 90-day window derived from
the public events feed — real data, but it undercounts, and the UI labels
it honestly as "Past 90 days" rather than claiming a full graph. With a
token you get the true 12-month contribution calendar via GraphQL.

**3. Wire up the contact form.** Set `RESEND_API_KEY` in `.env.local`.
Without it the form validates input and then opens a prefilled `mailto:`
so no message is ever silently lost.

Set `NEXT_PUBLIC_SITE_URL` to your real domain so metadata, Open Graph
tags, `sitemap.xml` and `robots.txt` point at the right place.

## Design

Dark by default. Monochrome with one accent (`#4F8CFF`); no neon, no
decorative gradients. Three typefaces, each with a job: **Instrument Sans**
for display, **Inter** for body, **JetBrains Mono** for eyebrows, years,
badges and metadata — the mono face does structural work rather than
decoration.

The hero's signature element is a live **system topology**: the stack
Ragebait actually runs on (client → edge → API → AI judge → Mongo →
Socket.io) drawn as a hairline node graph, with packets of light travelling
the edges. It is SVG and SMIL — no canvas, no animation loop. That same
node-and-hairline language reappears as the rule under every section
heading and as the timeline spine.

Every animation respects `prefers-reduced-motion`: Lenis disables itself,
the preloader is skipped, the typing effect renders as static text, and the
topology renders complete but still.

## Structure

```
app/                 routes, metadata, sitemap, robots, OG image, API routes
  api/github/        cached GitHub stats (also consumed server-side)
  api/contact/       validated contact endpoint with mailto fallback
components/
  layout/            navbar, command palette, preloader, footer, page chrome
  sections/          one file per page section
  shared/            topology, motion primitives, spotlight card, previews
  ui/                shadcn/ui primitives
constants/           all copy and structured content
hooks/               scroll-spy, theme, media queries, keyboard shortcuts
lib/                 GitHub client, types, utilities
```

All copy lives in `constants/content.ts`. Changing wording never requires
touching a component.

## Notes

- `components/sections/github.tsx` is a server component; GitHub data is
  fetched at request time with hourly revalidation and never ships as JS.
  If GitHub is unreachable the section degrades to a single link.
- GSAP is used in exactly one place — the scroll-linked parallax on project
  previews — and is dynamically imported so it stays out of the initial
  bundle.
- Project previews are generated SVG motifs specific to each project. To
  use a real screenshot instead, add an image and swap it into
  `components/shared/project-preview.tsx`.
- The Instagram card renders in a disabled state until you add a URL to
  `SOCIALS.instagram` in `constants/site.ts`.
