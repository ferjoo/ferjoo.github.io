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

function DatabaseArt() {
  const boxes = [
    { x: 40, y: 40, w: 96, h: 56 },
    { x: 172, y: 24, w: 96, h: 72, accent: true },
    { x: 304, y: 40, w: 96, h: 56 },
    { x: 104, y: 140, w: 96, h: 56 },
    { x: 240, y: 140, w: 96, h: 56 },
  ]
  return (
    <svg viewBox="0 0 440 230" className="h-full w-full text-ink-3" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M136 68h36M268 60h36M152 140v-28h68v-16M288 140v-28h-68" />
      </g>
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="10" className={b.accent ? 'fill-accent' : 'fill-fill-2'} />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={b.x + 12} y={b.y + 14 + r * 12} width={b.w - (r ? 40 : 24)} height="4" rx="2" className={b.accent ? 'fill-white/70' : 'fill-canvas'} />
          ))}
        </g>
      ))}
    </svg>
  )
}

const art: Record<ProjectId, () => ReactNode> = {
  dashboard: DashboardArt,
  database: DatabaseArt,
  pokemon: LexerArt,
  backrooms: BackroomsArt,
}

function ProjectTile({ project, t, wide, flip }: { project: Project; t: Content; wide: boolean; flip: boolean }) {
  const Art = art[project.id]
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-[28px] bg-fill ${wide ? (flip ? 'md:flex-row' : 'md:flex-row-reverse') : ''}`}>
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
          <Reveal key={project.id} delay={i * 0.06} className={i < 2 ? 'md:col-span-2' : ''}>
            <ProjectTile project={project} t={t} wide={i < 2} flip={i === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
