import { Github, Instagram, Linkedin, Code2 } from "lucide-react";
import { SITE, SOCIALS } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { name: "GitHub", href: SOCIALS.github, Icon: Github },
    { name: "LinkedIn", href: SOCIALS.linkedin, Icon: Linkedin },
    { name: "LeetCode", href: SOCIALS.leetcode, Icon: Code2 },
    { name: "Instagram", href: SOCIALS.instagram, Icon: Instagram },
  ].filter((l): l is { name: string; href: string; Icon: typeof Github } =>
    Boolean(l.href),
  );

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[14px] text-muted">
            Made with <span className="text-accent">♥</span> by {SITE.name}
          </p>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
            © {year} · All rights reserved
          </p>
        </div>

        <ul className="flex items-center gap-1">
          {links.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-[var(--fg-subtle)] transition-colors duration-300 hover:border-[var(--line)] hover:text-[var(--fg)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
