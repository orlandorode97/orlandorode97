import { TerminalWindow } from './TerminalWindow'
import { Terminal } from './Terminal'

export function TerminalView() {
  return (
    <div className="bg-grid min-h-screen w-full bg-[#010409] p-3 font-mono sm:p-5">
      <TerminalWindow>
        <Terminal />
      </TerminalWindow>
    </div>
  )
}
