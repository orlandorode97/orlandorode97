import { SectionHeading } from './SectionHeading'
import { ProjectCard } from './ProjectCard'
import type { Profile, Repo } from '../../lib/github'
import { featuredRepos } from '../../lib/github'

export function Projects({ repos, profile }: { repos: Repo[]; profile: Profile }) {
  const featured = featuredRepos(repos)

  return (
    <section className="mx-auto max-w-5xl px-6">
      <SectionHeading prompt="ls ~/projects">Featured Projects</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((repo) => (
          <ProjectCard key={repo.name} repo={repo} />
        ))}
      </div>

      <a
        href={`${profile.html_url}?tab=repositories`}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1 font-mono text-sm text-link hover:underline"
      >
        View all repositories →
      </a>
    </section>
  )
}
