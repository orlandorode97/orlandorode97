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

export function TechOutput() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 py-1 sm:grid-cols-3 md:grid-cols-4">
      {TECH.map((t) => (
        <div key={t.name} className="flex items-center gap-2">
          <img src={t.src} alt="" width={18} height={18} className="h-[18px] w-[18px]" loading="lazy" />
          <span className="text-text">{t.name}</span>
        </div>
      ))}
    </div>
  )
}
