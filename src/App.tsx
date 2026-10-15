import { useEffect, useState, type ReactNode } from 'react'
import { content, EMAIL, type Lang } from './content'

const LANG_KEY = 'portfolio-lang'

// Saved choice first, then the browser language; storage can throw in private windows.
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    // ignore unavailable storage
  }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 py-12 sm:py-16">
      <h2 id={`${id}-title`} className="mb-8 text-sm font-semibold uppercase tracking-widest text-accent">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const t = content[lang]
  const other: Lang = lang === 'en' ? 'es' : 'en'

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    try {
      localStorage.setItem(LANG_KEY, lang)
    } catch {
      // ignore unavailable storage
    }
  }, [lang, t.meta.title])

  const navItems = [
    ['about', t.nav.about],
    ['experience', t.nav.experience],
    ['skills', t.nav.skills],
    ['education', t.nav.education],
    ['contact', t.nav.contact],
  ] as const

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/85 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/85">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Fernando Morales
          </a>
          <nav aria-label="Main" className="hidden gap-5 text-sm md:flex">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="text-zinc-600 transition-colors hover:text-accent dark:text-zinc-400">
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setLang(other)}
            lang={other}
            className="rounded-full border border-zinc-300 px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-zinc-700"
          >
            {t.langSwitch}
          </button>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-4xl px-4 sm:px-6">
        <section id="top" className="pb-8 pt-16 sm:pt-24">
          <p className="mb-3 text-sm font-medium text-accent">{t.hero.role}</p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Fernando Morales Ralda
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{t.hero.tagline}</p>
          <p className="mt-3 text-sm text-zinc-500">{t.hero.location}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:text-zinc-950"
            >
              {t.hero.ctaContact}
            </a>
            <a
              href="#experience"
              className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent dark:border-zinc-700"
            >
              {t.hero.ctaExperience}
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                <dt className="mt-1 text-xs leading-snug text-zinc-500">{s.label}</dt>
                <dd className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Section id="about" title={t.about.title}>
          <div className="max-w-3xl space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" title={t.experience.title}>
          <ol className="space-y-10">
            {t.experience.jobs.map((job) => (
              <li key={job.company} className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
                <span aria-hidden="true" className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {job.role} <span className="font-normal text-zinc-500">· {job.company}</span>
                  </h3>
                  <p className="text-sm tabular-nums text-zinc-500">{job.period}</p>
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-700 marker:text-zinc-400 dark:text-zinc-300">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="skills" title={t.skills.title}>
          <div className="grid gap-6 sm:grid-cols-2">
            {t.skills.groups.map((group) => (
              <div key={group.name}>
                <h3 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-100">{group.name}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full bg-accent-soft px-3 py-1 text-sm text-zinc-800 dark:text-zinc-100">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title={t.education.title}>
          <ul className="space-y-4">
            {t.education.items.map((item) => (
              <li key={item.degree} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{item.degree}</p>
                  <p className="text-sm text-zinc-500">{item.school}</p>
                </div>
                <p className="text-sm tabular-nums text-zinc-500">{item.period}</p>
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-10 font-semibold text-zinc-900 dark:text-zinc-100">
            {t.education.certsTitle}{' '}
            <span className="font-normal text-zinc-500">
              · {t.education.certs.issuer}, {t.education.certs.year}
            </span>
          </h3>
          <ul className="flex flex-wrap gap-2">
            {t.education.certs.names.map((name) => (
              <li key={name} className="rounded-full border border-zinc-300 px-3 py-1 text-sm dark:border-zinc-700">
                {name}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title={t.contact.title}>
          <p className="max-w-2xl text-lg text-zinc-700 dark:text-zinc-300">{t.contact.text}</p>
          <a href={`mailto:${EMAIL}`} className="mt-4 inline-block text-lg font-semibold text-accent underline-offset-4 hover:underline">
            {EMAIL}
          </a>
        </Section>
      </main>

      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
        <p>
          © {new Date().getFullYear()} Fernando Morales Ralda · {t.footer}
        </p>
      </footer>
    </>
  )
}
