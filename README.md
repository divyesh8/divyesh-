<div align="center">

![Divyesh Kolli — Full Stack & AI Developer](https://divyeshkolli.vercel.app/opengraph-image)

# Divyesh Kolli — Portfolio

A premium, minimalist portfolio for a full-stack &amp; AI developer.
Dark by default, buttery-smooth scrolling, and a live system-topology hero.

**[View it live →](https://divyeshkolli.vercel.app)**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## Overview

A personal portfolio built to feel at home next to the work of Apple, Stripe,
Linear and Vercel — monochrome with a single blue accent, generous whitespace,
and motion that stays subtle. The hero opens on a **live node graph of the stack
these projects actually run on** (client → edge → API → AI → database), drawn in
SVG with light packets travelling the edges.

Everything respects `prefers-reduced-motion`, ships accessible keyboard focus,
and is built to score in the Lighthouse 90s.

## Features

- **Signature hero** — an animated system-topology graphic instead of a stock illustration
- **Live GitHub section** — repos, top languages and a contribution calendar pulled from the GitHub API at request time
- **Command palette** — `⌘K` / `Ctrl K` navigation, links and theme switching
- **Working contact form** — validated, with real email delivery and a graceful `mailto` fallback
- **Dark / light themes** — dark by default, remembered per visitor, no flash on load
- **Considered motion** — scroll reveals, magnetic buttons, spotlight cards, a custom cursor and Lenis smooth scroll
- **Fully responsive** — from a 375px phone up, with a dedicated mobile navigation
- **SEO-ready** — Open Graph, Twitter cards, JSON-LD, a generated favicon, sitemap and robots

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion, GSAP, Lenis |
| UI | shadcn/ui, Radix, Lucide, cmdk |
| Deploy | Vercel |

## Sections

`Hero` · `About` · `Skills` · `Work` · `Journey` · `GitHub` · `Profiles` · `Resume` · `Contact`

## Running locally

```bash
git clone https://github.com/divyesh8/divyesh-.git
cd divyesh-
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Optional environment variables (the site runs fine without them — see
`.env.example`): a GitHub token for the full contribution calendar, and a Resend
key for contact-form delivery.

## Project structure

```
app/          routes, metadata, sitemap, robots, OG image, API routes
components/    layout · sections · shared · ui
constants/     all copy and structured content
hooks/         scroll-spy, theme, media queries, keyboard shortcuts
lib/           GitHub client, types, utilities
```

## Connect

- **Portfolio** — [divyeshkolli.vercel.app](https://divyeshkolli.vercel.app)
- **GitHub** — [@divyesh8](https://github.com/divyesh8)
- **LinkedIn** — [Divyesh Kolli](https://www.linkedin.com/in/divyesh-kolli-690b0a102/)
- **LeetCode** — [_divyesshh](https://leetcode.com/u/_divyesshh/)

---

<div align="center">
<sub>Designed &amp; built by Divyesh Kolli.</sub>
</div>
