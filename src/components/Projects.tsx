import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { Content, Project, ProjectId } from '../content'
import { Chip, Icon, Reveal, Section } from './ui'

// Small looping illustrations built with CSS/SVG instead of screenshots, so they stay crisp and themeable.
function DashboardArt() {
  const bars = [38, 62, 45, 80, 56, 92, 70]
  return (
    <div className="flex h-full flex-col justify-end gap-3 p-6">
      <div className="flex gap-2">
        {['GTQ 48.2K', '+12.4%', '6 shops'].map((label) => (
          <span key={label} className="rounded-md bg-white/70 px-2 py-1 font-mono text-[10px] text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300">
            {label}
          </span>
        ))}
      </div>
      <div className="flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-accent/70 to-accent-2/70"
            initial={{ height: '10%' }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
    </div>
  )
}

function LexerArt() {
  const lines: [string, string][][] = [
    [['Jugador', 'text-accent-2'], [':', 'text-zinc-400'], [' "Ash"', 'text-amber-500'], [' {', 'text-zinc-400']],
    [['  "pikachu"', 'text-amber-500'], ['[electrico]', 'text-accent'], [' :=', 'text-zinc-400'], [' (', 'text-zinc-400']],
    [['    [salud]', 'text-accent'], ['=', 'text-zinc-400'], ['12', 'text-rose-500'], [';', 'text-zinc-400']],
    [['    [ataque]', 'text-accent'], ['=', 'text-zinc-400'], ['16', 'text-rose-500'], [';', 'text-zinc-400']],
    [['  )', 'text-zinc-400']],
    [['}', 'text-zinc-400']],
  ]
  return (
    <div className="flex h-full flex-col justify-center p-6 font-mono text-xs leading-6">
      {lines.map((tokens, row) => (
        <motion.div
          key={row}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: row * 0.12, duration: 0.4 }}
          className="whitespace-pre"
        >
          {tokens.map(([text, color], i) => (
            <span key={i} className={`${color} rounded-sm transition-colors hover:bg-accent/15`}>
              {text}
            </span>
          ))}
          {row === lines.length - 1 && <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />}
        </motion.div>
      ))}
    </div>
  )
}

function BackroomsArt() {
  return (
    <div className="relative h-full overflow-hidden bg-[#2b2611] [perspective:220px]">
      <div className="absolute inset-x-0 top-0 h-1/2 origin-bottom bg-[repeating-linear-gradient(90deg,#e8dc8a_0_38px,#fff7c2_38px_44px)] [transform:rotateX(-62deg)] opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 origin-top animate-[marquee_6s_linear_infinite] bg-[repeating-linear-gradient(0deg,#8a7a3a_0_14px,#7d6f33_14px_28px)] [transform:rotateX(62deg)] [width:200%]" />
      <div className="absolute inset-y-[22%] left-[38%] right-[38%] rounded-sm bg-black/70 shadow-[0_0_40px_10px_rgba(0,0,0,0.6)]" />
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_45%,transparent_20%,rgba(0,0,0,0.65)_75%)]" />
    </div>
  )
}

const art: Record<ProjectId, () => ReactNode> = {
  chapinwin: DashboardArt,
  pokemon: LexerArt,
  backrooms: BackroomsArt,
}

function ProjectCard({ project, t, featured }: { project: Project; t: Content; featured: boolean }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const glare = useTransform(ry, [-6, 6], ['0%', '100%'])
  const Art = art[project.id]

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    event.currentTarget.style.setProperty('--mx', `${px * 100}%`)
    event.currentTarget.style.setProperty('--my', `${py * 100}%`)
    if (event.pointerType !== 'mouse') return
    ry.set((px - 0.5) * 12)
    rx.set((0.5 - py) * 10)
  }

  function onPointerLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`spotlight-card group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white/70 backdrop-blur transition-[border-color,box-shadow] hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 dark:border-zinc-800 dark:bg-zinc-900/60 ${
        featured ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden border-b border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 ${featured ? 'h-56 lg:h-full lg:border-b-0 lg:border-r' : 'h-48'}`}>
        <Art />
        <motion.span
          aria-hidden="true"
          style={{ left: glare }}
          className="pointer-events-none absolute -top-1/2 h-[200%] w-24 -translate-x-1/2 rotate-12 bg-white/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{project.kind}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-zinc-900 dark:text-white">{project.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-zinc-900"
          >
            {t.projects.demo}
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent dark:border-zinc-700"
          >
            <Icon name="github" className="h-3.5 w-3.5" />
            {t.projects.code}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects({ t }: { t: Content }) {
  return (
    <Section id="projects" index="03" title={t.projects.title}>
      <Reveal>
        <p className="-mt-6 mb-10 text-lg text-zinc-600 dark:text-zinc-400">{t.projects.subtitle}</p>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        {t.projects.items.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08} className={i === 0 ? 'lg:col-span-2' : ''}>
            <ProjectCard project={project} t={t} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
