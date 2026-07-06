import type { Repo } from '../../lib/github'
import { displayName, languageColor } from '../../lib/github'

export function ProjectCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-semibold text-link group-hover:underline">
          {displayName(repo.name)}
        </h3>
        <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-text-muted">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1" title="Stars">
              <StarIcon /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1" title="Forks">
              <ForkIcon /> {repo.forks_count}
            </span>
          )}
        </div>
      </div>

      <p className="mt-2 flex-1 text-sm text-text-muted">
        {repo.description?.trim() || 'No description provided.'}
      </p>

      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border-muted bg-surface-2 px-2 py-0.5 text-[11px] text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {repo.language && (
        <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: languageColor(repo.language) }}
            aria-hidden
          />
          {repo.language}
        </div>
      )}
    </a>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" width={13} height={13} fill="currentColor" aria-hidden>
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  )
}

function ForkIcon() {
  return (
    <svg viewBox="0 0 16 16" width={13} height={13} fill="currentColor" aria-hidden>
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  )
}
