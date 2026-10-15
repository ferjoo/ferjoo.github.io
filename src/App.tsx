import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { content, EMAIL } from './content'
import { useCopy, useLang, useTheme } from './hooks'
import { Background } from './components/Background'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { About, Education, Experience, Skills, Stats } from './components/Sections'

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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        {t.skip}
      </a>
      <Background />
      <Header t={t} dark={dark} onToggleTheme={toggleTheme} onToggleLang={toggleLang} onOpenPalette={() => setPaletteOpen(true)} />

      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6">
        <Hero t={t} lang={lang} dark={dark} onOpenPalette={() => setPaletteOpen(true)} />
        <Stats t={t} lang={lang} />
        <About t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Education t={t} />
        <Contact t={t} lang={lang} />
      </main>

      <footer className="border-t border-zinc-200/70 py-10 dark:border-zinc-800/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-zinc-500 sm:px-6">
          <p>
            © {new Date().getFullYear()} Fernando Morales Ralda · {t.footer}
          </p>
          <p className="font-mono text-xs">⌘K / Ctrl+K</p>
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
