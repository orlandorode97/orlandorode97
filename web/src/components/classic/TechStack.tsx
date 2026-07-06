import { SectionHeading } from './SectionHeading'

// Reuses the icon set already curated in the profile README.
const TECH: { name: string; src: string }[] = [
  { name: 'Go', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'TypeScript', src: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Docker', src: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'GitHub Actions', src: 'https://cdn.simpleicons.org/githubactions/2088FF' },
  { name: 'Google Cloud', src: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
  { name: 'PostgreSQL', src: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'MySQL', src: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'Linux', src: 'https://cdn.simpleicons.org/linux/FCC624' },
  { name: 'Neovim', src: 'https://cdn.simpleicons.org/neovim/57A143' },
  { name: 'Git', src: 'https://cdn.simpleicons.org/git/F05032' },
]

export function TechStack() {
  return (
    <section className="mx-auto max-w-5xl px-6">
      <SectionHeading prompt="cat tech-stack.txt">Tech Stack</SectionHeading>
      <div className="flex flex-wrap gap-3">
        {TECH.map((t) => (
          <div
            key={t.name}
            className="group flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 transition-colors hover:border-accent/50"
          >
            <img src={t.src} alt="" width={22} height={22} className="h-[22px] w-[22px]" loading="lazy" />
            <span className="text-sm text-text group-hover:text-heading">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
