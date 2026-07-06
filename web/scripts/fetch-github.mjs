// Snapshots the GitHub profile + repos into src/data/github.json at build time
// using the `gh` CLI. In CI, `gh` authenticates via the GH_TOKEN env var.
//
//   npm run fetch:gh
//
// No runtime API calls happen in the browser — the app ships this static JSON.

import { execFileSync } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const USER = 'orlandorode97'
const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../src/data/github.json')

function gh(endpoint) {
  const out = execFileSync('gh', ['api', endpoint, '--cache', '1h'], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  })
  return JSON.parse(out)
}

function main() {
  console.log(`Fetching profile for @${USER}…`)
  const p = gh(`users/${USER}`)

  console.log('Fetching repositories…')
  const rawRepos = gh(`users/${USER}/repos?per_page=100&sort=updated`)

  // Own, active repos only — drop forks and archived experiments.
  const repos = rawRepos
    .filter((r) => !r.fork && !r.archived)
    .map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      html_url: r.html_url,
      homepage: r.homepage || null,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      topics: r.topics || [],
      updated_at: r.updated_at,
    }))
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count
      }
      return new Date(b.updated_at) - new Date(a.updated_at)
    })

  // Derived stats.
  const languages = {}
  let totalStars = 0
  for (const r of repos) {
    totalStars += r.stargazers_count
    if (r.language) languages[r.language] = (languages[r.language] || 0) + 1
  }

  const data = {
    profile: {
      login: p.login,
      name: p.name,
      avatar_url: p.avatar_url,
      html_url: p.html_url,
      bio: p.bio,
      company: p.company,
      location: p.location,
      blog: p.blog || null,
      twitter_username: p.twitter_username,
      followers: p.followers,
      following: p.following,
      public_repos: p.public_repos,
      created_at: p.created_at,
    },
    repos,
    stats: {
      totalStars,
      ownRepos: repos.length,
      languages,
    },
    generatedAt: new Date().toISOString(),
  }

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
  console.log(
    `Wrote ${OUT}\n  ${repos.length} repos · ${totalStars} stars · ` +
      `${Object.keys(languages).length} languages`,
  )
}

main()
