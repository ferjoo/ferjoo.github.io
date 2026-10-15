import type { ReactNode } from 'react'
import type { Content, Project, ProjectId } from '../content'
import { ChevronLink, Reveal, Section } from './ui'

// Quiet, monochrome illustrations with a single accent, drawn in code so they stay crisp in both themes.
function DashboardArt() {
  const bars = [34, 52, 41, 68, 57, 82, 64, 90]
  return (
    <div className="flex h-full items-end justify-center gap-3 px-10 pb-0 pt-10">
      {bars.map((h, i) => (
        <span key={i} style={{ height: `${h}%` }} className={`w-6 rounded-t-lg sm:w-8 ${i === bars.length - 1 ? 'bg-accent' : 'bg-fill-2'}`} />
      ))}
    </div>
  )
}

function LexerArt() {
  return (
    <pre className="flex h-full items-center justify-center font-mono text-[13px] leading-6 text-ink-3">
      <code>
        <span className="text-ink">Jugador</span>: <span className="text-accent">"Ash"</span> {'{'}
        {'\n'}  <span className="text-accent">"pikachu"</span>[electrico] := (
        {'\n'}    [salud]=<span className="text-ink">12</span>;
        {'\n'}    [ataque]=<span className="text-ink">16</span>;
        {'\n'}  )
        {'\n'}
        {'}'}
      </code>
    </pre>
  )
}

function BackroomsArt() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full text-ink-3" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="160" y="70" width="80" height="80" />
        <path d="M0 0 160 70M400 0 240 70M0 220 160 150M400 220 240 150" />
        <path d="M60 26v168M110 48v124M290 48v124M340 26v168" opacity="0.5" />
      </g>
      <rect x="180" y="88" width="40" height="62" className="fill-accent" opacity="0.9" />
    </svg>
  )
}

const art: Record<ProjectId, () => ReactNode> = {
  dashboard: DashboardArt,
  pokemon: LexerArt,
  backrooms: BackroomsArt,
}

function ProjectTile({ project, t, wide }: { project: Project; t: Content; wide: boolean }) {
  const Art = art[project.id]
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-[28px] bg-fill ${wide ? 'md:flex-row-reverse' : ''}`}>
      <div className={`h-56 shrink-0 ${wide ? 'md:h-auto md:w-1/2' : ''}`}>
        <Art />
      </div>
      <div className={`flex flex-1 flex-col p-8 sm:p-10 ${wide ? 'md:justify-center' : ''}`}>
        <p className="text-sm text-ink-3">{project.kind}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{project.title}</h3>
        <p className="mt-4 flex-1 text-[17px] leading-relaxed text-ink-2">{project.description}</p>
        <p className="mt-5 text-sm text-ink-3">{project.stack.join(' · ')}</p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[17px]">
          <ChevronLink href={project.demo} external>
            {t.projects.demo}
          </ChevronLink>
          <ChevronLink href={project.code} external>
            {t.projects.code}
          </ChevronLink>
        </div>
      </div>
    </article>
  )
}

export function Projects({ t }: { t: Content }) {
  return (
    <Section id="projects" title={t.projects.title}>
      <Reveal>
        <p className="-mt-8 mb-12 text-xl text-ink-2 sm:-mt-10">{t.projects.subtitle}</p>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        {t.projects.items.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.06} className={i === 0 ? 'md:col-span-2' : ''}>
            <ProjectTile project={project} t={t} wide={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
