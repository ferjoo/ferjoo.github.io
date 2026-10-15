import type { Content, Lang } from '../content'
import { Reveal, Section } from './ui'

export function Stats({ t, lang }: { t: Content; lang: Lang }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-12 border-y border-line py-16 md:grid-cols-4">
      {t.stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06} className="flex flex-col-reverse justify-end text-center">
          <dt className="mx-auto mt-2 max-w-[14rem] text-sm leading-snug text-ink-2">{s.label}</dt>
          <dd className="text-5xl font-semibold tracking-tight text-ink">
            {s.value.toLocaleString(lang === 'es' ? 'es-GT' : 'en-US')}
            {s.suffix}
          </dd>
        </Reveal>
      ))}
    </dl>
  )
}

export function About({ t }: { t: Content }) {
  return (
    <Section id="about" title={t.about.title}>
      <div className="space-y-8">
        {t.about.paragraphs.map((p, i) => (
          <Reveal key={p} delay={i * 0.08}>
            <p className={`max-w-4xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl ${i === 0 ? 'text-ink' : 'text-ink-2'}`}>{p}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

// Inset grouped list, as in iOS Settings: one rounded container, hairline separators between rows.
export function Experience({ t }: { t: Content }) {
  return (
    <Section id="experience" title={t.experience.title}>
      <Reveal>
        <ol className="divide-y divide-line overflow-hidden rounded-[28px] bg-fill">
          {t.experience.jobs.map((job) => (
            <li key={job.company} className="p-7 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{job.role}</h3>
                <p className="text-sm text-ink-3">{job.period}</p>
              </div>
              <p className="mt-1 text-ink-2">{job.company}</p>
              <ul className="mt-5 space-y-3 text-[17px] leading-relaxed text-ink-2">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-3">{job.stack.join(' · ')}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}

export function Skills({ t }: { t: Content }) {
  return (
    <Section id="skills" title={t.skills.title}>
      <div className="grid gap-12 sm:grid-cols-3">
        {t.skills.groups.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.06}>
            <h3 className="mb-4 text-sm font-semibold text-ink">{group.name}</h3>
            <ul className="space-y-2 text-[17px] text-ink-2">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid gap-12 border-t border-line pt-12 sm:grid-cols-2">
        <Reveal>
          <h3 className="mb-4 text-sm font-semibold text-ink">{t.education.title}</h3>
          <ul className="space-y-4">
            {t.education.items.map((item) => (
              <li key={item.degree}>
                <p className="text-[17px] text-ink">{item.degree}</p>
                <p className="text-sm text-ink-3">
                  {item.school} · {item.period}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.06}>
          <h3 className="mb-4 text-sm font-semibold text-ink">
            {t.education.certsTitle} <span className="font-normal text-ink-3">· {t.education.certs.issuer}, {t.education.certs.year}</span>
          </h3>
          <ul className="space-y-2 text-[17px] text-ink-2">
            {t.education.certs.names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
