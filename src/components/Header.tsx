import type { Content } from '../content'
import { Icon } from './ui'

export const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'contact'] as const

interface HeaderProps {
  t: Content
  dark: boolean
  onToggleTheme: () => void
  onToggleLang: () => void
  onOpenPalette: () => void
}

// Thin translucent bar in the spirit of apple.com's global nav.
export function Header({ t, dark, onToggleTheme, onToggleLang, onOpenPalette }: HeaderProps) {
  const control = 'grid h-11 min-w-11 place-items-center rounded-full px-2 text-ink-2 transition-colors hover:text-ink'

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/72 backdrop-blur-xl backdrop-saturate-[1.8]">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-4 px-5">
        <a href="#top" className="text-sm font-semibold tracking-tight text-ink">
          Fernando Morales
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-xs text-ink-2">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-ink">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-2 flex items-center">
          <button type="button" onClick={onOpenPalette} aria-label={t.palette.open} className={control}>
            <Icon name="search" />
          </button>
          <button type="button" onClick={onToggleLang} aria-label={t.palette.switchLang} className={`${control} text-xs font-medium`}>
            {t.langSwitch}
          </button>
          <button type="button" onClick={onToggleTheme} aria-label={dark ? t.theme.light : t.theme.dark} className={control}>
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>
        </div>
      </div>
    </header>
  )
}
