import { github } from '../../lib/github'
import { Hero } from './Hero'
import { StatCards } from './StatCards'
import { TechStack } from './TechStack'
import { LanguageBar } from './LanguageBar'
import { Projects } from './Projects'
import { Footer } from './Footer'

export function ClassicView() {
  const { profile, repos, stats, generatedAt } = github

  return (
    <div className="min-h-screen">
      <Hero profile={profile} />
      <main className="flex flex-col gap-16 pt-4 sm:gap-20">
        <StatCards data={github} />
        <TechStack />
        <LanguageBar languages={stats.languages} />
        <Projects repos={repos} profile={profile} />
      </main>
      <Footer profile={profile} generatedAt={generatedAt} />
    </div>
  )
}
