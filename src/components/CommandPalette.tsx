import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GITHUB, type Content } from '../content'
import { SECTION_IDS } from './Header'
import { Icon } from './ui'

interface Command {
  id: string
  group: string
  label: string
  icon: Parameters<typeof Icon>[0]['name']
  run: () => void
}

interface PaletteProps {
  open: boolean
  onClose: () => void
  t: Content
  onToggleLang: () => void
  onToggleTheme: () => void
  onCopyEmail: () => void
}

export function CommandPalette({ open, onClose, t, onToggleLang, onToggleTheme, onCopyEmail }: PaletteProps) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    return [
      ...SECTION_IDS.map((id) => ({ id: `go-${id}`, group: t.palette.goTo, label: t.nav[id], icon: 'arrow' as const, run: go(id) })),
      ...t.projects.items.map((p) => ({
        id: `demo-${p.id}`,
        group: t.projects.title,
        label: `${p.title} — ${t.projects.demo}`,
        icon: 'globe' as const,
        run: () => window.open(p.demo, '_blank', 'noopener'),
      })),
      { id: 'lang', group: t.palette.actions, label: t.palette.switchLang, icon: 'globe', run: onToggleLang },
      { id: 'theme', group: t.palette.actions, label: t.palette.toggleTheme, icon: 'moon', run: onToggleTheme },
      { id: 'copy', group: t.palette.actions, label: t.palette.copyEmail, icon: 'copy', run: onCopyEmail },
      { id: 'github', group: t.palette.actions, label: t.palette.openGithub, icon: 'github', run: () => window.open(GITHUB, '_blank', 'noopener') },
    ]
  }, [t, onToggleLang, onToggleTheme, onCopyEmail])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q)) : commands
  }, [commands, query])

  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement | null
      setQuery('')
      setIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      restoreFocus.current?.focus()
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  function run(command: Command | undefined) {
    if (!command) return
    onClose()
    command.run()
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIndex((i) => (i + 1) % Math.max(filtered.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      run(filtered[index])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'Tab') {
      // Keep focus inside the dialog; the input is its only tab stop.
      event.preventDefault()
    }
  }

  let lastGroup = ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/40 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.palette.open}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            onKeyDown={onKeyDown}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800">
              <Icon name="search" className="h-4 w-4 text-zinc-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.palette.placeholder}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
                className="h-14 flex-1 bg-transparent outline-none placeholder:text-zinc-400"
              />
            </div>
            <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-zinc-500">{t.palette.empty}</li>}
              {filtered.map((command, i) => {
                const header = command.group !== lastGroup ? command.group : null
                lastGroup = command.group
                const selected = i === index
                return (
                  <li key={command.id} role="presentation">
                    {header && <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-zinc-400">{header}</p>}
                    <div
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(command)}
                      className={`relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${selected ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}
                    >
                      {selected && (
                        <motion.span layoutId="palette-highlight" className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-zinc-800" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                      )}
                      <Icon name={command.icon} className="relative h-4 w-4 text-accent" />
                      <span className="relative">{command.label}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="border-t border-zinc-200 px-4 py-2.5 font-mono text-[11px] text-zinc-400 dark:border-zinc-800">{t.palette.hint}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
