/** The shell prompt shown before every command: orlando@mx:~ $ */
export function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-green">orlando@mx</span>
      <span className="text-text-muted">:</span>
      <span className="text-blue">~</span>
      <span className="text-text-muted">&nbsp;$&nbsp;</span>
    </span>
  )
}
