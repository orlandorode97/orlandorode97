import { useEffect, useRef, useState } from 'react'

/**
 * Types `text` out one character at a time. When `skip` flips true it reveals
 * the full string immediately. `onDone` fires exactly once when fully typed.
 */
export function TypedText({
  text,
  speed = 22,
  skip = false,
  onDone,
}: {
  text: string
  speed?: number
  skip?: boolean
  onDone?: () => void
}) {
  const [n, setN] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (skip) {
      setN(text.length)
      return
    }
    if (n >= text.length) return
    const id = setTimeout(() => setN((v) => v + 1), speed)
    return () => clearTimeout(id)
  }, [n, skip, text, speed])

  useEffect(() => {
    if (n >= text.length && !doneRef.current) {
      doneRef.current = true
      onDone?.()
    }
  }, [n, text.length, onDone])

  return <span>{text.slice(0, n)}</span>
}
