import { useId, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EMAIL, GITHUB, TIME_ZONE, type Content, type Lang } from '../content'
import { useCopy, useLocalTime } from '../hooks'
import { Icon, Magnetic, Reveal, Section } from './ui'

function Burst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className={`absolute h-1.5 w-1.5 rounded-full ${i % 2 ? 'bg-accent' : 'bg-accent-2'}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * 46, y: Math.sin(angle) * 46, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        )
      })}
    </span>
  )
}

export function Contact({ t, lang }: { t: Content; lang: Lang }) {
  const c = t.contact
  const [topic, setTopic] = useState(c.topics[0].id)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(0)
  const { copied, copy } = useCopy(EMAIL)
  const [bursts, setBursts] = useState(0)
  const time = useLocalTime(TIME_ZONE, lang)
  const ids = { name: useId(), message: useId(), topic: useId() }

  const subject = c.topics.find((x) => x.id === topic)?.subject ?? c.topics[0].subject

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const fullSubject = name.trim() ? `${subject} — ${name.trim()}` : subject
    const body = [c.greeting, '', message.trim(), '', name.trim() ? `— ${name.trim()}` : ''].join('\n')
    setSent((n) => n + 1)
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`
  }

  async function onCopy() {
    await copy()
    setBursts((n) => n + 1)
  }

  return (
    <Section id="contact" index="05" title={c.title}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] [&>*]:min-w-0">
        <Reveal>
          <p className="text-gradient animate-shimmer font-display text-4xl font-bold leading-tight sm:text-5xl">{c.headline}</p>
          <p className="mt-6 max-w-md text-lg text-zinc-600 dark:text-zinc-400">{c.text}</p>

          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${EMAIL}`} className="break-all font-mono text-lg text-zinc-900 underline-offset-4 hover:text-accent hover:underline dark:text-white">
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={onCopy}
                className="relative inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold transition-colors hover:border-accent hover:text-accent dark:border-zinc-700"
              >
                <AnimatePresence>{bursts > 0 && copied && <Burst key={bursts} />}</AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'done' : 'copy'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Icon name={copied ? 'check' : 'copy'} className="h-3.5 w-3.5" />
                    {copied ? c.copied : c.copy}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span role="status" className="sr-only">
                {copied ? c.copied : ''}
              </span>
            </div>
            <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Icon name="clock" />
              {c.localTime}: <span className="font-mono text-zinc-900 dark:text-white">{time}</span> (GMT-6)
            </p>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-zinc-600 hover:text-accent dark:text-zinc-400">
              <Icon name="github" />
              github.com/ferjoo
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="spotlight-card overflow-hidden rounded-3xl border border-zinc-200 bg-white/70 shadow-2xl shadow-accent/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70"
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
            }}
          >
            <div className="flex items-center gap-2 border-b border-zinc-200 px-5 py-3 dark:border-zinc-800">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-3 min-w-0 truncate font-mono text-xs text-zinc-500">
                to: {EMAIL} · {subject}
              </span>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <fieldset>
                <legend id={ids.topic} className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
                  {c.topicLabel}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {c.topics.map((option) => {
                    const active = option.id === topic
                    return (
                      <label
                        key={option.id}
                        className={`relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                          active ? 'text-white dark:text-zinc-950' : 'text-zinc-700 hover:text-accent dark:text-zinc-300'
                        }`}
                      >
                        <input type="radio" name="topic" value={option.id} checked={active} onChange={() => setTopic(option.id)} className="sr-only" />
                        {active && (
                          <motion.span
                            layoutId="topic-pill"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        {!active && <span className="absolute inset-0 rounded-full border border-zinc-300 dark:border-zinc-700" />}
                        <span className="relative">{option.label}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor={ids.name} className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-white">
                  {c.nameLabel}
                </label>
                <input
                  id={ids.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={c.namePlaceholder}
                  autoComplete="name"
                  className="w-full rounded-xl border border-zinc-300 bg-white/80 px-4 py-3 outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-accent focus:ring-4 focus:ring-accent/15 dark:border-zinc-700 dark:bg-zinc-950/60"
                />
              </div>

              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor={ids.message} className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {c.messageLabel}
                  </label>
                  <span className="font-mono text-xs text-zinc-400">{message.length}/1000</span>
                </div>
                <textarea
                  id={ids.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                  placeholder={c.messagePlaceholder}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-zinc-300 bg-white/80 px-4 py-3 outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-accent focus:ring-4 focus:ring-accent/15 dark:border-zinc-700 dark:bg-zinc-950/60"
                />
              </div>

              <Magnetic strength={0.2}>
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white dark:bg-white dark:text-zinc-900"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:translate-x-0" />
                  <span className="relative">{c.send}</span>
                  <motion.span key={sent} className="relative" initial={sent ? { x: 0, y: 0 } : false} animate={sent ? { x: [0, 30, -30, 0], y: [0, -20, 20, 0], opacity: [1, 0, 0, 1] } : {}} transition={{ duration: 0.8 }}>
                    <Icon name="mail" />
                  </motion.span>
                </button>
              </Magnetic>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
