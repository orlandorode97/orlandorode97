import data from '../data/github.json'

export interface Repo {
  name: string
  description: string | null
  language: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
}

export interface Profile {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  company: string | null
  location: string | null
  blog: string | null
  twitter_username: string | null
  followers: number
  following: number
  public_repos: number
  created_at: string
}

export interface GitHubData {
  profile: Profile
  repos: Repo[]
  stats: {
    totalStars: number
    ownRepos: number
    languages: Record<string, number>
  }
  generatedAt: string
}

export const github = data as GitHubData

/** Canonical GitHub language colors for the languages in this profile. */
export const LANGUAGE_COLORS: Record<string, string> = {
  Go: '#00ADD8',
  TypeScript: '#3178c6',
  Rust: '#dea584',
  C: '#555555',
  Lua: '#000080',
  Shell: '#89e051',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
}

export function languageColor(language: string | null): string {
  if (!language) return '#8b949e'
  return LANGUAGE_COLORS[language] ?? '#8b949e'
}

/** Whole years since the account was created (relative to now). */
export function yearsOnGitHub(createdAt: string): number {
  const created = new Date(createdAt)
  const diffMs = Date.now() - created.getTime()
  return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000))
}

/** Languages sorted by repo count, with percentage of the total. */
export function languageBreakdown(
  languages: Record<string, number>,
): { name: string; count: number; pct: number }[] {
  const total = Object.values(languages).reduce((a, b) => a + b, 0)
  return Object.entries(languages)
    .map(([name, count]) => ({ name, count, pct: total ? (count / total) * 100 : 0 }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Curated featured repos, in display order. Falls back gracefully to whatever
 * is present in the snapshot so the page never renders an empty section.
 */
export function featuredRepos(repos: Repo[], limit = 6): Repo[] {
  const preferred = [
    'gofetch',
    'countdown-ui',
    'gofilter',
    'github-stats',
    'go-examples',
    'c-as-go',
  ]
  const byName = new Map(repos.map((r) => [r.name, r]))
  const picked: Repo[] = []
  for (const name of preferred) {
    const repo = byName.get(name)
    if (repo) picked.push(repo)
  }
  // Top up with the next repos (already star/recency sorted) not already picked.
  for (const repo of repos) {
    if (picked.length >= limit) break
    if (!picked.includes(repo)) picked.push(repo)
  }
  return picked.slice(0, limit)
}

/** Human display name for a repo, mapping known aliases. */
export function displayName(name: string): string {
  if (name === 'countdown-ui') return 'countdown-tui'
  return name
}
