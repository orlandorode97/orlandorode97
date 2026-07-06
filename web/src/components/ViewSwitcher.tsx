export type View = 'classic' | 'terminal'

export function ViewSwitcher({
  view,
  onChange,
}: {
  view: View
  onChange: (v: View) => void
}) {
  const options: { id: View; label: string }[] = [
    { id: 'classic', label: 'Classic' },
    { id: 'terminal', label: 'Terminal' },
  ]

  return (
    <div className="fixed top-3 right-3 z-50 flex items-center gap-1 rounded-full border border-border bg-titlebar/90 p-1 font-mono text-xs shadow-lg backdrop-blur sm:top-4 sm:right-4">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={view === o.id}
          className={
            'rounded-full px-3 py-1 transition-colors ' +
            (view === o.id
              ? 'bg-accent-strong text-white'
              : 'text-text-muted hover:text-heading')
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
