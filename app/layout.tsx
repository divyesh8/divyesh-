import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { SITE, SOCIALS } from "@/constants/site";
import "./globals.css";

/* Display carries the personality; Inter delivers the body text; the mono
   face does structural work — eyebrows, years, badges, metadata. */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    "Divyesh Kolli",
    "Full Stack Developer",
    "AI Developer",
    "Cloud Computing",
    "SRM Institute of Science and Technology",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: `@${SITE.handle}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#FBFBFA" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

/** Person + WebSite structured data, so search engines read the page as a
 *  profile rather than a generic document. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: SITE.legalName,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: SITE.role,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: SITE.university,
  },
  knowsAbout: [
    "Cloud Computing",
    "Artificial Intelligence",
    "Full Stack Development",
    "Next.js",
    "React",
    "Node.js",
  ],
  sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.leetcode].filter(Boolean),
};

/** Set the theme before first paint so there is never a flash. */
const themeScript = `
(function(){try{
  var t = localStorage.getItem('dk-theme');
  document.documentElement.dataset.theme = (t === 'light' || t === 'dark') ? t : 'dark';
}catch(e){document.documentElement.dataset.theme='dark';}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${instrumentSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
