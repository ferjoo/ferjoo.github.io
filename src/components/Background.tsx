import { useEffect, useRef } from 'react'
import { useFinePointer } from '../hooks'

// Fixed decorative layer: drifting aurora blobs, a masked grid, film grain and a glow that follows the cursor.
export function Background() {
  const glowRef = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()

  useEffect(() => {
    if (!finePointer) return
    let frame = 0
    function onMove(event: PointerEvent) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        glowRef.current?.style.setProperty('--cx', `${event.clientX}px`)
        glowRef.current?.style.setProperty('--cy', `${event.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [finePointer])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-1/4 -top-1/4 h-[70vmax] w-[70vmax] animate-aurora rounded-full bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_60%)] opacity-[0.16] blur-3xl dark:opacity-[0.22]" />
      <div className="absolute -bottom-1/3 -right-1/4 h-[65vmax] w-[65vmax] animate-aurora rounded-full bg-[radial-gradient(circle,var(--color-accent-2)_0%,transparent_60%)] opacity-[0.14] blur-3xl [animation-delay:-11s] dark:opacity-[0.2]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(127_127_127/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(127_127_127/0.08)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay dark:opacity-[0.08]" />
      {finePointer && (
        <div
          ref={glowRef}
          className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--cx,50%)_var(--cy,-20%),color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_60%)]"
        />
      )}
    </div>
  )
}
