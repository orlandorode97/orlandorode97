import type { GitHubData } from '../../lib/github'
import { yearsOnGitHub } from '../../lib/github'

export function StatCards({ data }: { data: GitHubData }) {
  const { profile, stats } = data
  const cards = [
    { label: 'Public repos', value: profile.public_repos },
    { label: 'Total stars', value: stats.totalStars },
    { label: 'Followers', value: profile.followers },
    { label: 'Years on GitHub', value: yearsOnGitHub(profile.created_at) },
  ]

  return (
    <section aria-label="GitHub statistics" className="mx-auto max-w-5xl px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-lg border border-border bg-surface p-4 text-center transition-colors hover:border-accent/50"
          >
            <div className="font-mono text-3xl font-bold text-heading sm:text-4xl">{c.value}</div>
            <div className="mt-1 text-xs tracking-wide text-text-muted uppercase">{c.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
