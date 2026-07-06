import { languageBreakdown, languageColor } from '../lib/github'

/** Compact colored block bar, neofetch-style: ██████░░ */
export function BlockBar({
  languages,
  blocks = 22,
}: {
  languages: Record<string, number>
  blocks?: number
}) {
  const breakdown = languageBreakdown(languages)
  const segments: { name: string; count: number }[] = []
  let used = 0
  breakdown.forEach((l, i) => {
    let count =
      i === breakdown.length - 1
        ? blocks - used
        : Math.max(1, Math.round((l.pct / 100) * blocks))
    if (count < 0) count = 0
    used += count
    segments.push({ name: l.name, count })
  })

  return (
    <span aria-label="Language distribution">
      {segments.map((s) => (
        <span key={s.name} style={{ color: languageColor(s.name) }}>
          {'█'.repeat(s.count)}
        </span>
      ))}
    </span>
  )
}

/** Full breakdown list with animated proportional bars. */
export function LangList({ languages }: { languages: Record<string, number> }) {
  const breakdown = languageBreakdown(languages)
  const max = breakdown[0]?.pct ?? 100
  return (
    <div className="mt-1 flex flex-col gap-1.5">
      {breakdown.map((l) => (
        <div key={l.name} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-text">{l.name}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-sm bg-surface-2">
            <div
              className="h-full rounded-sm transition-[width] duration-700 ease-out"
              style={{ width: `${(l.pct / max) * 100}%`, backgroundColor: languageColor(l.name) }}
            />
          </div>
          <span className="w-20 shrink-0 text-right text-text-muted">
            {l.pct.toFixed(0)}% · {l.count}
          </span>
        </div>
      ))}
    </div>
  )
}
