import type { ReactNode } from 'react'
import { github, yearsOnGitHub } from '../../lib/github'
import { BlockBar } from '../LangBar'

export function Neofetch() {
  const { profile, stats } = github
  const rows: [string, ReactNode][] = [
    ['Name', profile.name ?? profile.login],
    ['Role', 'Software Engineer'],
    ['Locale', 'México 🇲🇽'],
    ['Uptime', `${yearsOnGitHub(profile.created_at)} years on GitHub`],
    ['Repos', String(profile.public_repos)],
    ['Stars', String(stats.totalStars)],
    ['Following', `${profile.following} · ${profile.followers} followers`],
    [
      'Langs',
      <span className="whitespace-nowrap">
        <BlockBar languages={stats.languages} />
      </span>,
    ],
  ]

  return (
    <div className="flex flex-col gap-5 py-1 sm:flex-row sm:gap-7">
      <div className="shrink-0">
        <div className="w-fit rounded-md border border-border bg-surface-2 p-1.5">
          <img
            src={profile.avatar_url}
            alt="avatar"
            width={132}
            height={132}
            className="h-28 w-28 rounded sm:h-32 sm:w-32"
          />
        </div>
      </div>

      <div className="min-w-0">
        <div>
          <span className="text-green">{profile.login}</span>
          <span className="text-text-muted">@</span>
          <span className="text-blue">github</span>
        </div>
        <div className="text-text-muted">--------------------</div>
        <div className="mt-0.5 flex flex-col gap-0.5">
          {rows.map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span className="w-20 shrink-0 text-cyan">{k}</span>
              <span className="text-text-muted">:</span>
              <span className="text-text">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
