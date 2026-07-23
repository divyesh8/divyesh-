export const SITE = {
  name: "Divyesh Kolli",
  /** As printed on the resume. */
  legalName: "Kolli Divyesh",
  role: "Full Stack Developer",
  handle: "divyesh8",
  email: "kolli.divyesh@gmail.com",
  phone: "+91 99669 68300",
  location: "Chennai, India",
  university: "SRM Institute of Science and Technology",
  /** Override in production via NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://divyeshkolli.vercel.app",
  title: "Divyesh Kolli — Full Stack & AI Developer",
  description:
    "B.Tech Cloud Computing student at SRM building AI-powered products, real-time platforms, and scalable web applications.",
  resumePath: "/Divyesh-Kolli-Resume.pdf",
} as const;

export const SOCIALS = {
  github: "https://github.com/divyesh8",
  linkedin: "https://www.linkedin.com/in/divyesh-kolli-690b0a102/",
  leetcode: "https://leetcode.com/u/_divyesshh/",
  /** Not published yet — the card renders in a disabled state. */
  instagram: null as string | null,
};

export type SectionId =
  | "hero"
  | "about"
  | "skills"
  | "work"
  | "journey"
  | "github"
  | "profiles"
  | "resume"
  | "contact";

export const NAV: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

/** Every section the scroll-spy observes, in document order. */
export const SECTION_IDS: SectionId[] = [
  "hero",
  "about",
  "skills",
  "work",
  "journey",
  "github",
  "profiles",
  "resume",
  "contact",
];
