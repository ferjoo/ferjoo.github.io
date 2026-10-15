import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { ContactShadows, Float, PresentationControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import type { Content } from '../content'

const TEX_W = 1024
const TEX_H = 640
const CARD_W = 3.2
const CARD_H = 2
const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", "Segoe UI", sans-serif'

interface Finish {
  from: string
  to: string
  ink: string
  ink2: string
  body: string
}

// Matte titanium in the spirit of Apple Card: white in light mode, space black in dark mode.
function finish(dark: boolean): Finish {
  return dark
    ? { from: '#48484a', to: '#1c1c1e', ink: '#f5f5f7', ink2: '#a1a1a6', body: '#2c2c2e' }
    : { from: '#fdfdfd', to: '#e4e4e8', ink: '#1d1d1f', ink2: '#86868b', body: '#ececef' }
}

function paintSurface(ctx: CanvasRenderingContext2D, f: Finish) {
  ctx.clearRect(0, 0, TEX_W, TEX_H)
  ctx.beginPath()
  ctx.roundRect(0, 0, TEX_W, TEX_H, 38)
  const g = ctx.createLinearGradient(0, 0, TEX_W, TEX_H)
  g.addColorStop(0, f.from)
  g.addColorStop(1, f.to)
  ctx.fillStyle = g
  ctx.fill()
}

function drawFront(ctx: CanvasRenderingContext2D, t: Content, f: Finish) {
  paintSurface(ctx, f)
  ctx.fillStyle = f.ink2
  ctx.font = `600 40px ${SYSTEM_FONT}`
  ctx.fillText('FM', 72, 108)

  ctx.fillStyle = f.ink
  ctx.font = `600 56px ${SYSTEM_FONT}`
  ctx.fillText('Fernando Morales Ralda', 72, TEX_H - 128)
  ctx.fillStyle = f.ink2
  ctx.font = `400 32px ${SYSTEM_FONT}`
  ctx.fillText(t.hero.role, 72, TEX_H - 76)
}

function drawBack(ctx: CanvasRenderingContext2D, t: Content, f: Finish) {
  paintSurface(ctx, f)
  ctx.fillStyle = f.ink2
  ctx.font = `600 26px ${SYSTEM_FONT}`
  ctx.fillText(t.card.back.toUpperCase(), 72, 104)

  ctx.font = `500 38px ${SYSTEM_FONT}`
  t.card.stack.forEach((item, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    ctx.fillStyle = f.ink
    ctx.fillText(item, 72 + col * 440, 196 + row * 76)
  })

  ctx.fillStyle = f.ink2
  ctx.font = `400 26px ${SYSTEM_FONT}`
  ctx.fillText('ferjoo.github.io', 72, TEX_H - 64)
}

function useCardTextures(t: Content, dark: boolean) {
  const [textures, setTextures] = useState<{ front: THREE.CanvasTexture; back: THREE.CanvasTexture } | null>(null)

  useEffect(() => {
    const f = finish(dark)
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
    const next = { front: make((ctx) => drawFront(ctx, t, f)), back: make((ctx) => drawBack(ctx, t, f)) }
    setTextures(next)
    return () => {
      next.front.dispose()
      next.back.dispose()
    }
  }, [t, dark])

  return textures
}

function Card({ t, dark }: { t: Content; dark: boolean }) {
  const group = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const textures = useCardTextures(t, dark)
  const { viewport } = useThree()
  const scale = Math.min(1, viewport.width / (CARD_W + 0.5))

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, flipped ? Math.PI : 0, 4, delta)
  })

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    // A drag that ends on the card should rotate it, not flip it.
    if (event.delta > 6) return
    setFlipped((value) => !value)
  }

  return (
    <group
      ref={group}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      <RoundedBox args={[CARD_W, CARD_H, 0.045]} radius={0.12} smoothness={8}>
        <meshPhysicalMaterial color={finish(dark).body} roughness={0.45} metalness={0.55} clearcoat={0.3} clearcoatRoughness={0.4} />
      </RoundedBox>
      {textures && (
        <>
          <mesh position={[0, 0, 0.0235]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshStandardMaterial map={textures.front} transparent roughness={0.5} metalness={0.15} />
          </mesh>
          <mesh position={[0, 0, -0.0235]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshStandardMaterial map={textures.back} transparent roughness={0.5} metalness={0.15} />
          </mesh>
        </>
      )}
    </group>
  )
}

export default function ProfileCard3D({ t, dark }: { t: Content; dark: boolean }) {
  return (
    <div className="relative h-full w-full">
      <p className="sr-only">
        Fernando Morales Ralda, {t.hero.role}. {t.card.back}: {t.card.stack.join(', ')}.
      </p>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.2, 5.6], fov: 38 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
        <ambientLight intensity={dark ? 0.7 : 1.2} />
        <directionalLight position={[2.5, 4, 5]} intensity={dark ? 1.6 : 2} />
        <directionalLight position={[-4, -1, 3]} intensity={0.5} />
        <PresentationControls global={false} cursor snap rotation={[0.12, -0.28, 0]} polar={[-0.4, 0.4]} azimuth={[-0.8, 0.8]}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
            <Card t={t} dark={dark} />
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -1.55, 0]} opacity={dark ? 0.6 : 0.3} scale={9} blur={2.8} far={3} />
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-xs text-ink-3">{t.card.flip}</p>
    </div>
  )
}
