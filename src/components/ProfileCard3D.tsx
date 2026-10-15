import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { Float, PresentationControls, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import type { Content } from '../content'

const TEX_W = 1024
const TEX_H = 640
const CARD_W = 3.2
const CARD_H = 2

interface Palette {
  bgFrom: string
  bgTo: string
  text: string
  muted: string
  accent: string
  accent2: string
  chip: string
}

function palette(dark: boolean): Palette {
  return dark
    ? { bgFrom: '#0b1016', bgTo: '#161b26', text: '#f4f4f5', muted: '#a1a1aa', accent: '#2dd4bf', accent2: '#a78bfa', chip: 'rgba(255,255,255,0.08)' }
    : { bgFrom: '#ffffff', bgTo: '#eef2f7', text: '#18181b', muted: '#52525b', accent: '#0d9488', accent2: '#7c3aed', chip: 'rgba(15,23,42,0.06)' }
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function paintBase(ctx: CanvasRenderingContext2D, p: Palette) {
  ctx.clearRect(0, 0, TEX_W, TEX_H)
  roundedRect(ctx, 0, 0, TEX_W, TEX_H, 38)
  const bg = ctx.createLinearGradient(0, 0, TEX_W, TEX_H)
  bg.addColorStop(0, p.bgFrom)
  bg.addColorStop(1, p.bgTo)
  ctx.fillStyle = bg
  ctx.fill()
  ctx.save()
  ctx.clip()
  for (const [x, y, r, color] of [
    [TEX_W * 0.92, TEX_H * 0.05, 360, p.accent],
    [TEX_W * 0.05, TEX_H * 1.05, 420, p.accent2],
  ] as const) {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r)
    glow.addColorStop(0, `${color}55`)
    glow.addColorStop(1, `${color}00`)
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, TEX_W, TEX_H)
  }
  ctx.restore()
}

function paintChips(ctx: CanvasRenderingContext2D, p: Palette, items: string[], x: number, y: number, maxWidth: number) {
  ctx.font = '500 26px "JetBrains Mono Variable", monospace'
  let cx = x
  let cy = y
  for (const item of items) {
    const w = ctx.measureText(item).width + 40
    if (cx + w > x + maxWidth) {
      cx = x
      cy += 62
    }
    roundedRect(ctx, cx, cy, w, 48, 24)
    ctx.fillStyle = p.chip
    ctx.fill()
    ctx.fillStyle = p.text
    ctx.fillText(item, cx + 20, cy + 33)
    cx += w + 14
  }
}

function drawFront(ctx: CanvasRenderingContext2D, t: Content, p: Palette) {
  paintBase(ctx, p)
  ctx.fillStyle = p.accent
  ctx.font = '600 26px "JetBrains Mono Variable", monospace'
  ctx.fillText(t.card.front.toUpperCase(), 64, 92)

  const logo = ctx.createLinearGradient(TEX_W - 160, 50, TEX_W - 64, 146)
  logo.addColorStop(0, p.accent)
  logo.addColorStop(1, p.accent2)
  roundedRect(ctx, TEX_W - 160, 50, 96, 96, 24)
  ctx.fillStyle = logo
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = '700 38px "JetBrains Mono Variable", monospace'
  ctx.fillText('FM', TEX_W - 141, 112)

  ctx.fillStyle = p.text
  ctx.font = '700 88px "Space Grotesk Variable", sans-serif'
  ctx.fillText('Fernando', 64, 240)
  ctx.fillText('Morales Ralda', 64, 330)

  ctx.fillStyle = p.muted
  ctx.font = '500 36px "Inter Variable", sans-serif'
  ctx.fillText(t.hero.role, 64, 392)

  paintChips(ctx, p, t.card.stack.slice(0, 4), 64, 462, TEX_W - 128)

  ctx.fillStyle = p.muted
  ctx.font = '500 24px "JetBrains Mono Variable", monospace'
  ctx.fillText('ferjoo.github.io', 64, TEX_H - 40)
}

function drawBack(ctx: CanvasRenderingContext2D, t: Content, p: Palette) {
  paintBase(ctx, p)
  ctx.fillStyle = p.accent
  ctx.font = '600 26px "JetBrains Mono Variable", monospace'
  ctx.fillText(t.card.back.toUpperCase(), 64, 92)

  paintChips(ctx, p, t.card.stack, 64, 140, TEX_W - 128)

  const stats = t.stats.slice(0, 3)
  stats.forEach((s, i) => {
    const x = 64 + i * 310
    ctx.fillStyle = p.text
    ctx.font = '700 64px "Space Grotesk Variable", sans-serif'
    ctx.fillText(`${s.value.toLocaleString('en-US')}${s.suffix}`, x, 470)
    ctx.fillStyle = p.muted
    ctx.font = '500 22px "Inter Variable", sans-serif'
    const words = s.label.split(' ')
    ctx.fillText(words.slice(0, 3).join(' '), x, 510)
    ctx.fillText(words.slice(3).join(' '), x, 540)
  })
}

function useCardTextures(t: Content, dark: boolean) {
  const [textures, setTextures] = useState<{ front: THREE.CanvasTexture; back: THREE.CanvasTexture } | null>(null)

  useEffect(() => {
    let cancelled = false
    const fonts = ['700 88px "Space Grotesk Variable"', '500 36px "Inter Variable"', '600 26px "JetBrains Mono Variable"']
    Promise.all(fonts.map((f) => document.fonts.load(f))).finally(() => {
      if (cancelled) return
      const p = palette(dark)
      const make = (draw: (ctx: CanvasRenderingContext2D) => void) => {
        const canvas = document.createElement('canvas')
        canvas.width = TEX_W
        canvas.height = TEX_H
        draw(canvas.getContext('2d')!)
        const texture = new THREE.CanvasTexture(canvas)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = 8
        return texture
      }
      setTextures({ front: make((ctx) => drawFront(ctx, t, p)), back: make((ctx) => drawBack(ctx, t, p)) })
    })
    return () => {
      cancelled = true
    }
  }, [t, dark])

  useEffect(
    () => () => {
      textures?.front.dispose()
      textures?.back.dispose()
    },
    [textures],
  )

  return textures
}

function Card({ t, dark }: { t: Content; dark: boolean }) {
  const group = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const textures = useCardTextures(t, dark)
  const { viewport } = useThree()
  const scale = Math.min(1, viewport.width / (CARD_W + 0.4))

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, flipped ? Math.PI : 0, 5, delta)
  })

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    // A drag that ends on the card should rotate it, not flip it.
    if (event.delta > 6) return
    setFlipped((f) => !f)
  }

  return (
    <group
      ref={group}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      <RoundedBox args={[CARD_W, CARD_H, 0.05]} radius={0.12} smoothness={6}>
        <meshPhysicalMaterial color={dark ? '#0b1016' : '#ffffff'} roughness={0.3} metalness={0.25} clearcoat={1} clearcoatRoughness={0.15} />
      </RoundedBox>
      {textures && (
        <>
          <mesh position={[0, 0, 0.027]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshStandardMaterial map={textures.front} transparent roughness={0.35} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, -0.027]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshStandardMaterial map={textures.back} transparent roughness={0.35} metalness={0.1} />
          </mesh>
        </>
      )}
    </group>
  )
}

export default function ProfileCard3D({ t, dark }: { t: Content; dark: boolean }) {
  const accent = dark ? '#2dd4bf' : '#0d9488'
  const accent2 = dark ? '#a78bfa' : '#7c3aed'

  return (
    <div className="relative h-full w-full">
      <p className="sr-only">
        {t.card.front}: Fernando Morales Ralda, {t.hero.role}. {t.card.back}: {t.card.stack.join(', ')}.
      </p>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.4], fov: 40 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
        <ambientLight intensity={dark ? 0.6 : 1.1} />
        <directionalLight position={[3, 4, 5]} intensity={dark ? 1.4 : 1.8} />
        <pointLight position={[-3, -2, 2]} intensity={18} color={accent2} />
        <pointLight position={[3, 2, 2]} intensity={12} color={accent} />
        <PresentationControls global={false} cursor snap rotation={[0.08, -0.32, 0]} polar={[-0.45, 0.45]} azimuth={[-0.9, 0.9]}>
          <Float speed={2} rotationIntensity={0.35} floatIntensity={0.7}>
            <Card t={t} dark={dark} />
          </Float>
        </PresentationControls>
        <Sparkles count={45} scale={[7, 4.5, 2]} size={2.2} speed={0.35} color={accent} opacity={0.7} />
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-mono text-xs text-zinc-500">{t.card.flip}</p>
    </div>
  )
}
