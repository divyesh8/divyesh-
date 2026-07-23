import type {
  ActivityCalendar,
  ActivityDay,
  GitHubRepo,
  GitHubStats,
  LanguageStat,
} from "@/lib/types";
import { SITE } from "@/constants/site";

const API = "https://api.github.com";
const REVALIDATE = 3600; // 1 hour

function headers() {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: headers(),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`GitHub ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

function bucket(count: number, max: number): ActivityDay["level"] {
  if (count <= 0) return 0;
  const ratio = count / Math.max(max, 1);
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Fixed-length day grid ending today, filled from a date -> count map.
 *  Starts on a Sunday so the columns read as real weeks. */
function buildGrid(counts: Map<string, number>, days: number) {
  const out: ActivityDay[] = [];
  let total = 0;
  const max = Math.max(1, ...counts.values());

  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  for (const d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const key = isoDay(d);
    const count = counts.get(key) ?? 0;
    total += count;
    out.push({ date: key, count, level: bucket(count, max) });
  }
  return { days: out, total };
}

/** Full 12-month contribution calendar. GraphQL only, needs GITHUB_TOKEN. */
async function calendarFromGraphQL(
  login: string,
): Promise<ActivityCalendar | null> {
  if (!process.env.GITHUB_TOKEN) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { date contributionCount } }
          }
        }
      }
    }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login } }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    const weeks = cal.weeks as {
      contributionDays: { date: string; contributionCount: number }[];
    }[];
    const flat = weeks.flatMap((w) => w.contributionDays);
    const max = Math.max(1, ...flat.map((d) => d.contributionCount));

    return {
      days: flat.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: bucket(d.contributionCount, max),
      })),
      total: cal.totalContributions as number,
      authoritative: true,
      windowLabel: "Past 12 months",
      weeks: weeks.length,
    };
  } catch {
    return null;
  }
}

/** Fallback: a real 90-day window from the public events feed. Genuine
 *  activity, but the feed caps at ~300 events so it undercounts — the UI
 *  labels it "Past 90 days" rather than claiming a full contribution graph. */
async function calendarFromEvents(login: string): Promise<ActivityCalendar> {
  const counts = new Map<string, number>();

  try {
    for (let page = 1; page <= 3; page++) {
      const events = await gh<
        { type: string; created_at: string; payload?: { commits?: unknown[] } }[]
      >(`/users/${login}/events/public?per_page=100&page=${page}`);
      if (!events.length) break;
      for (const e of events) {
        const day = e.created_at.slice(0, 10);
        const weight =
          e.type === "PushEvent" ? e.payload?.commits?.length ?? 1 : 1;
        counts.set(day, (counts.get(day) ?? 0) + weight);
      }
      if (events.length < 100) break;
    }
  } catch {
    // Leave counts empty; the grid still renders as a quiet 90 days.
  }

  const { days, total } = buildGrid(counts, 91);
  return {
    days,
    total,
    authoritative: false,
    windowLabel: "Past 90 days",
    weeks: Math.ceil(days.length / 7),
  };
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const login = SITE.handle;

  const [profileRaw, reposRaw] = await Promise.all([
    gh<{
      login: string;
      name: string | null;
      bio: string | null;
      avatar_url: string;
      html_url: string;
      public_repos: number;
      followers: number;
      following: number;
      created_at: string;
    }>(`/users/${login}`),
    gh<
      {
        name: string;
        description: string | null;
        html_url: string;
        language: string | null;
        stargazers_count: number;
        forks_count: number;
        pushed_at: string;
        fork: boolean;
        archived: boolean;
      }[]
    >(`/users/${login}/repos?per_page=100&sort=pushed`),
  ]);

  const repos: GitHubRepo[] = reposRaw
    .filter((r) => !r.fork && !r.archived)
    .map((r) => ({
      name: r.name,
      description: r.description,
      htmlUrl: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
    }));

  const langCounts = new Map<string, number>();
  for (const r of repos) {
    if (!r.language) continue;
    langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
  }
  const classified = [...langCounts.values()].reduce((a, b) => a + b, 0);
  const languages: LanguageStat[] = [...langCounts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      percent: classified ? Math.round((count / classified) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const calendar =
    (await calendarFromGraphQL(login)) ?? (await calendarFromEvents(login));

  return {
    profile: {
      login: profileRaw.login,
      name: profileRaw.name,
      bio: profileRaw.bio,
      avatarUrl: profileRaw.avatar_url,
      htmlUrl: profileRaw.html_url,
      publicRepos: profileRaw.public_repos,
      followers: profileRaw.followers,
      following: profileRaw.following,
      createdAt: profileRaw.created_at,
    },
    repos: repos.slice(0, 6),
    languages,
    calendar,
    totalStars: repos.reduce((sum, r) => sum + r.stars, 0),
  };
}
