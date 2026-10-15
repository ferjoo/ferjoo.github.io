import { lazy, Suspense, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Content } from '../content'
import { canUseWebGL } from '../hooks'
import { ChevronLink } from './ui'

// three.js only downloads when the 3D card is actually shown.
const ProfileCard3D = lazy(() => import('./ProfileCard3D'))

const ease = [0.28, 0.11, 0.32, 1] as const

function StaticCard({ t }: { t: Content }) {
  return (
    <div className="mx-auto flex aspect-[1.6] w-full max-w-sm flex-col justify-between rounded-[22px] bg-gradient-to-br from-[#fafafa] to-[#e6e6e9] p-6 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)] dark:from-[#2a2a2c] dark:to-[#141415]">
      <span className="text-sm font-semibold tracking-tight text-ink-2">FM</span>
      <div>
        <p className="text-lg font-semibold tracking-tight text-ink">Fernando Morales Ralda</p>
        <p className="text-sm text-ink-2">{t.hero.role}</p>
      </div>
    </div>
  )
}

export function Hero({ t, dark }: { t: Content; dark: boolean }) {
  const reduced = useReducedMotion()
  const [webgl] = useState(canUseWebGL)
  const show3D = webgl && !reduced

  return (
    <section id="top" className="flex min-h-[calc(100svh-3rem)] flex-col items-center justify-center pb-12 pt-20 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease }}
        className="text-sm text-ink-2"
      >
        {t.hero.location}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
        className="mt-5 whitespace-nowrap text-[clamp(1.75rem,8vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
      >
        Fernando Morales Ralda.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease }}
        className="mt-5 text-2xl font-semibold tracking-tight text-ink-2 sm:text-3xl"
      >
        {t.hero.role}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.35, ease }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl"
      >
        {t.hero.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.45, ease }}
        className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-lg"
      >
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-base font-normal text-white transition-colors hover:bg-accent-hover"
        >
          {t.hero.ctaContact}
        </a>
        <ChevronLink href="#projects">{t.hero.ctaProjects}</ChevronLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.55, ease }}
        className="mt-14 h-[340px] w-full max-w-3xl sm:h-[420px]"
      >
        {show3D ? (
          <Suspense
            fallback={
              <div className="grid h-full place-items-center">
                <StaticCard t={t} />
              </div>
            }
          >
            <ProfileCard3D t={t} dark={dark} />
          </Suspense>
        ) : (
          <div className="grid h-full place-items-center">
            <StaticCard t={t} />
          </div>
        )}
      </motion.div>
    </section>
  )
}
