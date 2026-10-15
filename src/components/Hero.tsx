import { Fragment, lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { TIME_ZONE, type Content, type Lang } from '../content'
import { canUseWebGL, useLocalTime } from '../hooks'
import { Chip, Icon, Kbd, Magnetic } from './ui'

// three.js only downloads when the 3D card is actually shown.
const ProfileCard3D = lazy(() => import('./ProfileCard3D'))

const NAME = ['Fernando', 'Morales', 'Ralda']

function RotatingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2400)
    return () => window.clearInterval(id)
  }, [reduced, words.length])

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient animate-shimmer whitespace-nowrap font-semibold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function ProfileCardFallback({ t }: { t: Content }) {
  return (
    <div className="spotlight-card mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-2xl shadow-accent/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.card.front}</p>
      <p className="mt-3 font-display text-2xl font-bold text-zinc-900 dark:text-white">Fernando Morales</p>
      <p className="text-zinc-500">{t.hero.role}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {t.card.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </div>
  )
}

export function Hero({ t, lang, dark, onOpenPalette }: { t: Content; lang: Lang; dark: boolean; onOpenPalette: () => void }) {
  const time = useLocalTime(TIME_ZONE, lang)
  const reduced = useReducedMotion()
  const [webgl] = useState(canUseWebGL)
  const show3D = webgl && !reduced
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <section id="top" className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-wrap items-center gap-3 rounded-full border border-zinc-300/80 bg-white/60 px-4 py-1.5 text-sm backdrop-blur dark:border-zinc-700/80 dark:bg-zinc-900/60"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-zinc-700 dark:text-zinc-300">{t.hero.available}</span>
          <span className="flex items-center gap-1 font-mono text-xs text-zinc-500">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {time} {t.hero.localTime}
          </span>
        </motion.p>

        <h1 className="mt-8 font-display text-5xl font-bold leading-[1.02] tracking-tight text-zinc-900 sm:text-7xl dark:text-white">
          {NAME.map((word, i) => (
            <Fragment key={word}>
            {i > 0 && ' '}
            <span className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
            </Fragment>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 space-y-4"
        >
          <p className="text-gradient animate-shimmer font-display text-2xl font-semibold sm:text-3xl">{t.hero.role}</p>
          <p className="text-xl text-zinc-700 sm:text-2xl dark:text-zinc-300">
            {t.hero.buildPrefix} <RotatingText words={t.hero.rotating} />
          </p>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{t.hero.tagline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white shadow-lg shadow-accent/20 dark:bg-white dark:text-zinc-900"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">{t.hero.ctaContact}</span>
              <Icon name="arrow" className="relative h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/50 px-6 py-3 font-semibold backdrop-blur transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:bg-zinc-900/50"
            >
              {t.hero.ctaProjects}
            </a>
          </Magnetic>
          <button type="button" onClick={onOpenPalette} className="hidden items-center gap-2 text-sm text-zinc-500 hover:text-accent sm:flex">
            {t.hero.paletteHint} <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
            <Kbd>K</Kbd>
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[380px] sm:h-[440px]"
      >
        {show3D ? (
          <Suspense fallback={<div className="grid h-full place-items-center"><ProfileCardFallback t={t} /></div>}>
            <ProfileCard3D t={t} dark={dark} />
          </Suspense>
        ) : (
          <div className="grid h-full place-items-center">
            <ProfileCardFallback t={t} />
          </div>
        )}
      </motion.div>
    </section>
  )
}
