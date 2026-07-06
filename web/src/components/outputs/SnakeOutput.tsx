const SNAKE_SRC =
  'https://raw.githubusercontent.com/orlandorode97/orlandorode97/output/snake.svg'

export function SnakeOutput() {
  return (
    <div className="py-1">
      <div className="text-text-muted">// contribution graph, eaten by a snake</div>
      <img
        src={SNAKE_SRC}
        alt="Contribution graph snake animation"
        className="mt-1 w-full max-w-2xl"
        loading="lazy"
      />
    </div>
  )
}
