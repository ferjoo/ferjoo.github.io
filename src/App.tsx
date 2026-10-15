import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { content, EMAIL } from './content'
import { useCopy, useLang, useTheme } from './hooks'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { About, Experience, Skills, Stats } from './components/Sections'

export default function App() {
  const { lang, toggleLang } = useLang()
  const { dark, toggleTheme } = useTheme()
  const { copy } = useCopy(EMAIL)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const t = content[lang]

  useEffect(() => {
    document.title = t.meta.title
  }, [t.meta.title])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        {t.skip}
      </a>
      <Header t={t} dark={dark} onToggleTheme={toggleTheme} onToggleLang={toggleLang} onOpenPalette={() => setPaletteOpen(true)} />

      <main id="main" className="mx-auto max-w-5xl px-5">
        <Hero t={t} lang={lang} dark={dark} />
        <Stats t={t} lang={lang} />
        <About t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Contact t={t} lang={lang} />
      </main>

      <footer className="bg-canvas-2 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 border-t border-line px-5 pt-6 text-xs text-ink-3">
          <p>Copyright © {new Date().getFullYear()} Fernando Morales Ralda.</p>
          <p>{t.footer}</p>
        </div>
      </footer>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        t={t}
        onToggleLang={toggleLang}
        onToggleTheme={toggleTheme}
        onCopyEmail={copy}
      />
    </MotionConfig>
  )
}
