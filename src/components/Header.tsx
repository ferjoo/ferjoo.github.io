import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import type { Content } from '../content'
import { Icon } from './ui'

export const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'contact'] as const

function useActiveSection() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return active
}

interface HeaderProps {
  t: Content
  dark: boolean
  onToggleTheme: () => void
  onToggleLang: () => void
  onOpenPalette: () => void
}

export function Header({ t, dark, onToggleTheme, onToggleLang, onOpenPalette }: HeaderProps) {
  const active = useActiveSection()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-zinc-50/70 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent to-accent-2"
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="group flex items-center gap-2 font-display font-bold tracking-tight text-zinc-900 dark:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-xs text-white transition-transform group-hover:rotate-12 dark:text-zinc-950">
            FM
          </span>
          <span className="hidden sm:inline">Fernando Morales</span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {SECTION_IDS.map((id) => (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`relative z-10 block rounded-full px-3 py-1.5 transition-colors ${
                    active === id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {t.nav[id]}
                </a>
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label={t.palette.open}
            className="flex items-center gap-1.5 rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:text-zinc-400"
          >
            <Icon name="command" className="h-3.5 w-3.5" />
            <span className="font-mono">K</span>
          </button>
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t.palette.switchLang}
            className="rounded-full border border-zinc-300 px-3 py-1.5 font-mono text-xs text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:text-zinc-400"
          >
            {t.langSwitch}
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={dark ? t.theme.light : t.theme.dark}
            className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:text-zinc-400"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? 'moon' : 'sun'}
                initial={{ y: 14, rotate: -90, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -14, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Icon name={dark ? 'moon' : 'sun'} />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  )
}
