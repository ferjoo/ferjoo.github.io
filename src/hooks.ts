import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Lang } from './content'

// Storage can throw in private windows or with blocked site data; the site must work without it.
function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // ignore unavailable storage
  }
}

export function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = readStorage('portfolio-lang')
    if (saved === 'en' || saved === 'es') return saved
    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next = current === 'en' ? 'es' : 'en'
      writeStorage('portfolio-lang', next)
      return next
    })
  }, [])

  return { lang, toggleLang }
}

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggleTheme = useCallback(() => {
    setDark((current) => {
      writeStorage('portfolio-theme', current ? 'light' : 'dark')
      return !current
    })
  }, [])

  return { dark, toggleTheme }
}

export function useLocalTime(timeZone: string, lang: Lang) {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat(lang === 'es' ? 'es-GT' : 'en-US', { timeZone, hour: '2-digit', minute: '2-digit' }),
    [lang, timeZone],
  )
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  return formatter.format(now)
}

export function useCopy(text: string, resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), resetAfterMs)
    return () => window.clearTimeout(id)
  }, [copied, resetAfterMs])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${text}`
    }
  }, [text])

  return { copied, copy }
}

export function useFinePointer() {
  const [fine, setFine] = useState(() => window.matchMedia('(pointer: fine)').matches)

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    const onChange = () => setFine(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return fine
}

export function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}
