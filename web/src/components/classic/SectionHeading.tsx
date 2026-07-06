import type { ReactNode } from 'react'

export function SectionHeading({ prompt, children }: { prompt: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <p className="font-mono text-sm text-accent">$ {prompt}</p>
      <h2 className="mt-1 text-2xl font-semibold text-heading">{children}</h2>
    </div>
  )
}
