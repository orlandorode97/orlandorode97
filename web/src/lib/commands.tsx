import type { ReactNode } from 'react'
import { github, displayName } from './github'
import { Neofetch } from '../components/outputs/Neofetch'
import { ProjectsOutput } from '../components/outputs/ProjectsOutput'
import { TechOutput } from '../components/outputs/TechOutput'
import { LangsOutput } from '../components/outputs/LangsOutput'
import { Social } from '../components/outputs/Social'
import { SnakeOutput } from '../components/outputs/SnakeOutput'
import { Help } from '../components/outputs/Help'

export interface CommandResult {
  node: ReactNode
  clear?: boolean
}

/** Commands surfaced in `help` and tab-completion. */
export const COMMANDS: { name: string; summary: string }[] = [
  { name: 'gofetch', summary: 'show profile summary (aka whoami)' },
  { name: 'ls ~/projects', summary: 'list all repositories' },
  { name: 'tech', summary: 'the tech stack I work with' },
  { name: 'langs', summary: 'language breakdown across repos' },
  { name: 'social', summary: 'where to find me' },
  { name: 'snake', summary: 'the contribution-graph snake' },
  { name: 'open <repo>', summary: 'open a repository in a new tab' },
  { name: 'help', summary: 'list available commands' },
  { name: 'clear', summary: 'clear the screen' },
]

const error = (msg: string): CommandResult => ({
  node: <span className="text-red">{msg}</span>,
})

export function runCommand(raw: string): CommandResult {
  const input = raw.trim()
  if (!input) return { node: null }

  const [cmd, ...args] = input.split(/\s+/)
  const name = cmd.toLowerCase()

  switch (name) {
    case 'gofetch':
    case 'neofetch':
    case 'whoami':
      return { node: <Neofetch /> }

    case 'ls':
    case 'projects':
    case 'repos':
      return { node: <ProjectsOutput /> }

    case 'tech':
    case 'stack':
      return { node: <TechOutput /> }

    case 'langs':
    case 'languages':
      return { node: <LangsOutput /> }

    case 'social':
    case 'links':
    case 'contact':
      return { node: <Social /> }

    case 'snake':
      return { node: <SnakeOutput /> }

    case 'help':
    case '?':
      return { node: <Help /> }

    case 'clear':
      return { node: null, clear: true }

    case 'open': {
      const target = args[0]?.toLowerCase()
      if (!target) return error('usage: open <repo>')
      const repo = github.repos.find(
        (r) => r.name.toLowerCase() === target || displayName(r.name).toLowerCase() === target,
      )
      if (!repo) return error(`open: no such repo: ${args[0]}`)
      window.open(repo.html_url, '_blank', 'noopener,noreferrer')
      return {
        node: (
          <span className="text-text-muted">
            opening <span className="text-blue">{displayName(repo.name)}</span> ↗
          </span>
        ),
      }
    }

    case 'sudo':
      return { node: <span className="text-text-muted">nice try 😄</span> }

    case 'exit':
    case 'quit':
      return { node: <span className="text-text-muted">there is no escape from the terminal.</span> }

    default:
      return error(
        `command not found: ${cmd} — type 'help' for a list of commands`,
      )
  }
}
