import { github, displayName, languageColor } from '../../lib/github'

export function ProjectsOutput() {
  const repos = github.repos
  return (
    <div className="py-1">
      <div className="text-text-muted">
        total {repos.length} · <span className="text-text">click a repo to open ↗</span>
      </div>
      <div className="mt-1 grid gap-x-8 gap-y-1 sm:grid-cols-2">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            title={repo.description ?? undefined}
            className="group flex items-center gap-2 rounded px-1 -mx-1 hover:bg-surface-2"
          >
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: languageColor(repo.language) }}
              aria-hidden
            />
            <span className="text-blue group-hover:underline">
              {displayName(repo.name)}
              <span className="text-text-muted">/</span>
            </span>
            {repo.stargazers_count > 0 && (
              <span className="text-yellow">★{repo.stargazers_count}</span>
            )}
            <span className="min-w-0 flex-1 truncate text-text-muted">
              {repo.description ?? '—'}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
