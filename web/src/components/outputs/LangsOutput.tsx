import { github } from '../../lib/github'
import { LangList } from '../LangBar'

export function LangsOutput() {
  return (
    <div className="max-w-xl py-1">
      <LangList languages={github.stats.languages} />
    </div>
  )
}
