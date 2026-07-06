import { COMMANDS } from '../../lib/commands'

export function Help() {
  return (
    <div className="py-1">
      <div className="text-text-muted">Available commands:</div>
      <div className="mt-1 flex flex-col gap-0.5">
        {COMMANDS.map((c) => (
          <div key={c.name} className="flex gap-3">
            <span className="w-36 shrink-0 text-green">{c.name}</span>
            <span className="text-text-muted">{c.summary}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-text-muted">
        Tip: use <span className="text-text">↑ / ↓</span> for history.
      </div>
    </div>
  )
}
