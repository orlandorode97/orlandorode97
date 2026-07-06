import type { ReactNode } from 'react'

export function TerminalWindow({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-window shadow-2xl shadow-black/60 ring-1 ring-white/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-titlebar px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red" />
        <span className="h-3 w-3 rounded-full bg-yellow" />
        <span className="h-3 w-3 rounded-full bg-green" />
        <span className="flex-1 text-center text-xs text-text-muted select-none">
          orlando@mx: ~
        </span>
        <span className="w-[52px]" aria-hidden />
      </div>
      {children}
    </div>
  )
}
