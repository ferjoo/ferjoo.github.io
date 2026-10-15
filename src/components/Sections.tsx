import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react'
import type { Content, Lang } from '../content'
import { Chip, Reveal, Section } from './ui'

function CountUp({ value, suffix, lang }: { value: number; suffix: string; lang: Lang }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduced, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString(lang === 'es' ? 'es-GT' : 'en-US')}
      <span className="text-accent">{suffix}</span>
    </span>
  )
}

export function Stats({ t, lang }: { t: Content; lang: Lang }) {
  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {t.stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08}>
          <div className="group flex h-full flex-col-reverse rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur transition-colors hover:border-accent/60 dark:border-zinc-800 dark:bg-zinc-900/50">
            <dt className="mt-2 text-sm leading-snug text-zinc-500">{s.label}</dt>
            <dd className="font-display text-4xl font-bold text-zinc-900 dark:text-white">
              <CountUp value={s.value} suffix={s.suffix} lang={lang} />
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  )
}

export function About({ t }: { t: Content }) {
  return (
    <Section id="about" index="01" title={t.about.title}>
      <div className="grid gap-6 lg:grid-cols-2">
        {t.about.paragraphs.map((p, i) => (
          <Reveal key={p} delay={i * 0.1}>
            <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{p}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Experience({ t }: { t: Content }) {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <Section id="experience" index="02" title={t.experience.title}>
      <ol ref={listRef} className="relative space-y-12 pl-8 sm:pl-12">
        <span aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-zinc-200 sm:left-[15px] dark:bg-zinc-800" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: line }}
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-accent to-accent-2 sm:left-[15px]"
        />
        {t.experience.jobs.map((job) => (
          <li key={job.company} className="relative">
            <span aria-hidden="true" className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center sm:-left-12 sm:ml-2">
              <span className="h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20" />
            </span>
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-semibold text-zinc-900 dark:text-white">
                  {job.role} <span className="font-normal text-accent">@ {job.company}</span>
                </h3>
                <p className="font-mono text-sm text-zinc-500">{job.period}</p>
              </div>
              <ul className="mt-4 space-y-2.5 text-zinc-700 dark:text-zinc-300">
                {job.points.map((point) => (
                  <li key={point} className="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Skills({ t }: { t: Content }) {
  return (
    <Section id="skills" index="04" title={t.skills.title}>
      <div className="space-y-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {t.skills.groups.map((group, row) => (
          <div key={group.name}>
            <p className="sr-only">
              {group.name}: {group.items.join(', ')}
            </p>
            <div aria-hidden="true" className="group flex overflow-hidden">
              <div
                className={`flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused] ${row % 2 ? 'animate-marquee-reverse' : 'animate-marquee'}`}
              >
                {[...group.items, ...group.items].map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="whitespace-nowrap rounded-xl border border-zinc-200 bg-white/70 px-5 py-3 font-display text-lg font-medium text-zinc-800 backdrop-blur transition-colors hover:border-accent hover:text-accent dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Education({ t }: { t: Content }) {
  return (
    <div className="grid gap-10 pb-8 lg:grid-cols-2">
      <Reveal>
        <h3 className="mb-6 font-mono text-sm uppercase tracking-widest text-accent">{t.education.title}</h3>
        <ul className="space-y-5">
          {t.education.items.map((item) => (
            <li key={item.degree}>
              <p className="font-display text-lg font-semibold text-zinc-900 dark:text-white">{item.degree}</p>
              <p className="text-sm text-zinc-500">
                {item.school} · <span className="font-mono">{item.period}</span>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="mb-6 font-mono text-sm uppercase tracking-widest text-accent">
          {t.education.certsTitle} · {t.education.certs.issuer} {t.education.certs.year}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {t.education.certs.names.map((name) => (
            <li key={name}>
              <Chip>{name}</Chip>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
