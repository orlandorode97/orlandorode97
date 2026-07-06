import type { Profile } from '../../lib/github'

const SNAKE_SRC =
  'https://raw.githubusercontent.com/orlandorode97/orlandorode97/output/snake.svg'

export function Footer({ profile, generatedAt }: { profile: Profile; generatedAt: string }) {
  const updated = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <footer className="mx-auto mt-8 max-w-5xl px-6 pb-16">
      <div className="rounded-lg border border-border bg-surface p-5">
        <img
          src={SNAKE_SRC}
          alt="Contribution graph snake animation"
          className="mx-auto w-full max-w-3xl"
          loading="lazy"
        />
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center text-sm text-text-muted">
        <a
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-link hover:underline"
        >
          github.com/{profile.login}
        </a>
        <p className="font-mono text-xs">Built with React + Tailwind · data snapshot {updated}</p>
      </div>
    </footer>
  )
}
