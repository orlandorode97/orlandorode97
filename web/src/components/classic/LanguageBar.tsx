import { SectionHeading } from './SectionHeading'
import { languageBreakdown, languageColor } from '../../lib/github'

export function LanguageBar({ languages }: { languages: Record<string, number> }) {
  const breakdown = languageBreakdown(languages)
  if (breakdown.length === 0) return null

  return (
    <section className="mx-auto max-w-5xl px-6">
      <SectionHeading prompt="git ls-languages">Languages</SectionHeading>

      <div className="rounded-lg border border-border bg-surface p-5">
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-2">
          {breakdown.map((l) => (
            <div
              key={l.name}
              style={{ width: `${l.pct}%`, backgroundColor: languageColor(l.name) }}
              title={`${l.name} · ${l.count} repos`}
              className="h-full"
            />
          ))}
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {breakdown.map((l) => (
            <li key={l.name} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: languageColor(l.name) }}
                aria-hidden
              />
              <span className="text-text">{l.name}</span>
              <span className="font-mono text-text-muted">{l.pct.toFixed(0)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
