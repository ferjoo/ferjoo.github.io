import { useId, useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { EMAIL, GITHUB, TIME_ZONE, type Content, type Lang } from '../content'
import { useCopy, useLocalTime } from '../hooks'
import { ChevronLink, Icon, Reveal, Section } from './ui'

const field = 'w-full rounded-xl bg-fill px-4 py-3 text-[17px] text-ink outline-none transition-shadow placeholder:text-ink-3 focus:ring-2 focus:ring-accent'

export function Contact({ t, lang }: { t: Content; lang: Lang }) {
  const c = t.contact
  const [topic, setTopic] = useState(c.topics[0].id)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const { copied, copy } = useCopy(EMAIL)
  const time = useLocalTime(TIME_ZONE, lang)
  const ids = { name: useId(), message: useId() }

  const subject = c.topics.find((x) => x.id === topic)?.subject ?? c.topics[0].subject

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const fullSubject = name.trim() ? `${subject} — ${name.trim()}` : subject
    const body = [c.greeting, '', message.trim(), '', name.trim() ? `— ${name.trim()}` : ''].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <Section id="contact" title={c.title}>
      <div className="grid gap-16 lg:grid-cols-2 [&>*]:min-w-0">
        <Reveal>
          <p className="text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">{c.headline}</p>
          <p className="mt-6 max-w-md text-xl text-ink-2">{c.text}</p>

          <div className="mt-10 space-y-3 text-[17px]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href={`mailto:${EMAIL}`} className="break-all text-accent hover:underline hover:underline-offset-4">
                {EMAIL}
              </a>
              <button type="button" onClick={copy} className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-ink">
                <Icon name={copied ? 'check' : 'copy'} />
                {copied ? c.copied : c.copy}
              </button>
              <span role="status" className="sr-only">
                {copied ? c.copied : ''}
              </span>
            </div>
            <p className="text-ink-2">
              {c.localTime}: <span className="text-ink">{time}</span> · GMT-6
            </p>
            <ChevronLink href={GITHUB} external>
              github.com/ferjoo
            </ChevronLink>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="space-y-6">
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-ink">{c.topicLabel}</legend>
              {/* Segmented control: one selected segment, a sliding thumb behind it. */}
              <div className="grid grid-cols-3 rounded-[10px] bg-fill p-0.5">
                {c.topics.map((option) => {
                  const active = option.id === topic
                  return (
                    <label
                      key={option.id}
                      className="relative flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-2 text-center text-[13px] font-medium text-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent"
                    >
                      <input type="radio" name="topic" value={option.id} checked={active} onChange={() => setTopic(option.id)} className="sr-only" />
                      {active && (
                        <motion.span
                          layoutId="segment-thumb"
                          className="absolute inset-0 rounded-lg bg-canvas shadow-[0_3px_8px_rgb(0_0_0/0.12),0_3px_1px_rgb(0_0_0/0.04)] dark:bg-fill-2"
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                      )}
                      <span className={`relative ${active ? '' : 'text-ink-2'}`}>{option.label}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor={ids.name} className="mb-2 block text-sm font-semibold text-ink">
                {c.nameLabel}
              </label>
              <input id={ids.name} value={name} onChange={(e) => setName(e.target.value)} placeholder={c.namePlaceholder} autoComplete="name" className={field} />
            </div>

            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <label htmlFor={ids.message} className="text-sm font-semibold text-ink">
                  {c.messageLabel}
                </label>
                <span className="text-xs text-ink-3">{message.length}/1000</span>
              </div>
              <textarea
                id={ids.message}
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                placeholder={c.messagePlaceholder}
                rows={5}
                className={`${field} resize-none`}
              />
            </div>

            <button type="submit" className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-[17px] text-white transition-colors hover:bg-accent-hover">
              {c.send}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
