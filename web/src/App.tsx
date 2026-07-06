import { useState } from 'react'
import { ClassicView } from './components/classic/ClassicView'
import { TerminalView } from './components/TerminalView'
import { ViewSwitcher, type View } from './components/ViewSwitcher'

const STORAGE_KEY = 'profile-view'

// Default to the classic card layout; allow ?view=terminal or a saved choice.
function initialView(): View {
  const param = new URLSearchParams(window.location.search).get('view')
  if (param === 'terminal' || param === 'classic') return param
  return localStorage.getItem(STORAGE_KEY) === 'terminal' ? 'terminal' : 'classic'
}

export default function App() {
  const [view, setView] = useState<View>(initialView)

  function choose(next: View) {
    setView(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <>
      <ViewSwitcher view={view} onChange={choose} />
      {view === 'classic' ? <ClassicView /> : <TerminalView />}
    </>
  )
}
