import { useEffect, useRef, useState } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import { Prompt } from './Prompt'
import { TypedText } from './TypedText'
import { runCommand } from '../lib/commands'

interface Entry {
  id: number
  cmd: string
  node: ReactNode
}

// Commands that auto-run (and type themselves out) when the page loads.
const BOOT = ['gofetch', 'ls ~/projects', 'help']

export function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [bootIndex, setBootIndex] = useState(0)
  const [typingCmd, setTypingCmd] = useState<string | null>(BOOT[0])
  const [bootDone, setBootDone] = useState(false)
  const [skip, setSkip] = useState(false)

  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histCursor, setHistCursor] = useState(-1)

  const idRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const nextId = () => ++idRef.current

  // Advance the boot sequence when the current line finishes typing.
  function handleTyped() {
    const cmd = BOOT[bootIndex]
    const { node } = runCommand(cmd)
    setEntries((prev) => [...prev, { id: nextId(), cmd, node }])
    const next = bootIndex + 1
    if (next < BOOT.length) {
      setBootIndex(next)
      setTypingCmd(BOOT[next])
    } else {
      setTypingCmd(null)
      setBootDone(true)
    }
  }

  // Keep the newest output in view; focus the input once boot completes.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [entries, typingCmd, bootDone])

  useEffect(() => {
    if (bootDone) inputRef.current?.focus()
  }, [bootDone])

  function submit() {
    const value = input
    const { node, clear } = runCommand(value)
    if (clear) {
      setEntries([])
    } else {
      setEntries((prev) => [...prev, { id: nextId(), cmd: value, node }])
    }
    if (value.trim()) setHistory((h) => [...h, value])
    setHistCursor(-1)
    setInput('')
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const cursor = histCursor === -1 ? history.length - 1 : Math.max(0, histCursor - 1)
      setHistCursor(cursor)
      setInput(history[cursor])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histCursor === -1) return
      const cursor = histCursor + 1
      if (cursor >= history.length) {
        setHistCursor(-1)
        setInput('')
      } else {
        setHistCursor(cursor)
        setInput(history[cursor])
      }
    }
  }

  function onWindowClick() {
    if (!bootDone) setSkip(true)
    inputRef.current?.focus()
  }

  return (
    <div
      onClick={onWindowClick}
      className="term-scroll max-h-[calc(100vh-2.5rem)] min-h-[70vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5"
    >
      {entries.map((e) => (
        <div key={e.id} className="mb-2">
          <div className="flex flex-wrap">
            <Prompt />
            <span className="text-text">{e.cmd}</span>
          </div>
          {e.node && <div className="mt-1 ml-0 sm:ml-1">{e.node}</div>}
        </div>
      ))}

      {typingCmd !== null && (
        <div className="mb-2 flex flex-wrap">
          <Prompt />
          <span className="text-text">
            <TypedText key={bootIndex} text={typingCmd} skip={skip} onDone={handleTyped} />
          </span>
          <span className="caret ml-0.5" />
        </div>
      )}

      {bootDone && (
        <div className="flex flex-wrap items-center">
          <Prompt />
          <div className="relative flex min-w-0 flex-1 items-center">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
              className="w-full bg-transparent text-text caret-transparent outline-none"
            />
            <span
              className="caret pointer-events-none absolute"
              style={{ left: `${input.length}ch` }}
            />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
