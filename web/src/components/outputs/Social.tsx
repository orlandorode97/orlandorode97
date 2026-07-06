import { github } from '../../lib/github'

export function Social() {
  const { profile } = github
  const links: { label: string; value: string; href: string }[] = [
    { label: 'GitHub', value: `github.com/${profile.login}`, href: profile.html_url },
  ]
  if (profile.blog) links.push({ label: 'Web', value: profile.blog, href: profile.blog })
  if (profile.twitter_username)
    links.push({
      label: 'X',
      value: `@${profile.twitter_username}`,
      href: `https://x.com/${profile.twitter_username}`,
    })

  return (
    <div className="flex flex-col gap-0.5 py-1">
      {links.map((l) => (
        <div key={l.label} className="flex gap-2">
          <span className="w-16 shrink-0 text-cyan">{l.label}</span>
          <span className="text-text-muted">:</span>
          <a href={l.href} target="_blank" rel="noreferrer" className="text-blue hover:underline">
            {l.value}
          </a>
        </div>
      ))}
    </div>
  )
}
