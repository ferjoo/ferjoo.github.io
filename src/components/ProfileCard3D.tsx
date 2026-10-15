import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, PresentationControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { EMAIL, type Content } from '../content'

const TEX_W = 1024
const TEX_H = 640
const CARD_W = 3.2
const CARD_H = 2
const DEPTH = 0.05
const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", "Segoe UI", sans-serif'

interface Finish {
  from: string
  to: string
  ink: string
  ink2: string
  body: string
  highlight: string
  shade: string
  metalness: number
}

// Brushed titanium in the spirit of Apple Card: white in light mode, space black in dark mode.
function finish(dark: boolean): Finish {
  return dark
    ? { from: '#4a4a4d', to: '#1e1e20', ink: '#e8e8ed', ink2: '#9a9aa0', body: '#2c2c2e', highlight: 'rgba(255,255,255,0.18)', shade: 'rgba(0,0,0,0.55)', metalness: 0.75 }
    : { from: '#fbfbfc', to: '#dcdce1', ink: '#2a2a2d', ink2: '#8a8a90', body: '#e2e2e6', highlight: 'rgba(255,255,255,0.9)', shade: 'rgba(0,0,0,0.22)', metalness: 0.6 }
}

function surface(ctx: CanvasRenderingContext2D, f: Finish) {
  ctx.clearRect(0, 0, TEX_W, TEX_H)
  ctx.beginPath()
  ctx.roundRect(0, 0, TEX_W, TEX_H, 38)
  const g = ctx.createLinearGradient(0, 0, TEX_W, TEX_H)
  g.addColorStop(0, f.from)
  g.addColorStop(1, f.to)
  ctx.fillStyle = g
  ctx.fill()
}

// Laser-etched look: a light edge below and a dark edge above the glyphs, like text cut into metal.
function etch(ctx: CanvasRenderingContext2D, f: Finish, text: string, x: number, y: number, color: string) {
  ctx.fillStyle = f.highlight
  ctx.fillText(text, x, y + 1.5)
  ctx.fillStyle = f.shade
  ctx.fillText(text, x, y - 1)
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

function chip(ctx: CanvasRenderingContext2D, f: Finish, x: number, y: number) {
  const w = 118
  const h = 90
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, 16)
  const g = ctx.createLinearGradient(x, y, x + w, y + h)
  g.addColorStop(0, f.from)
  g.addColorStop(0.5, f.to)
  g.addColorStop(1, f.from)
  ctx.fillStyle = g
  ctx.fill()
  ctx.strokeStyle = f.shade
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.clip()
  ctx.beginPath()
  for (const ly of [y + h * 0.33, y + h * 0.66]) {
    ctx.moveTo(x, ly)
    ctx.lineTo(x + w * 0.36, ly)
    ctx.moveTo(x + w * 0.64, ly)
    ctx.lineTo(x + w, ly)
  }
  ctx.moveTo(x + w * 0.36, y)
  ctx.lineTo(x + w * 0.36, y + h)
  ctx.moveTo(x + w * 0.64, y)
  ctx.lineTo(x + w * 0.64, y + h)
  ctx.stroke()
  ctx.restore()
}

function drawFront(ctx: CanvasRenderingContext2D, t: Content, f: Finish) {
  surface(ctx, f)
  ctx.font = `600 44px ${SYSTEM_FONT}`
  etch(ctx, f, 'FM', 72, 112, f.ink2)
  chip(ctx, f, 72, 214)

  ctx.font = `600 58px ${SYSTEM_FONT}`
  etch(ctx, f, 'Fernando Morales Ralda', 72, TEX_H - 124, f.ink)
  ctx.font = `400 32px ${SYSTEM_FONT}`
  etch(ctx, f, t.hero.role, 72, TEX_H - 72, f.ink2)
}

function drawBack(ctx: CanvasRenderingContext2D, t: Content, f: Finish) {
  surface(ctx, f)
  // Magnetic stripe.
  const stripe = ctx.createLinearGradient(0, 70, 0, 170)
  stripe.addColorStop(0, '#1d1d1f')
  stripe.addColorStop(1, '#2c2c2e')
  ctx.fillStyle = stripe
  ctx.fillRect(0, 70, TEX_W, 100)

  ctx.font = `600 24px ${SYSTEM_FONT}`
  etch(ctx, f, t.card.back.toUpperCase(), 72, 236, f.ink2)
  ctx.font = `500 36px ${SYSTEM_FONT}`
  t.card.stack.forEach((item, i) => {
    etch(ctx, f, item, 72 + (i % 4) * 225, 300 + Math.floor(i / 4) * 64, f.ink)
  })

  ctx.font = `400 28px ${SYSTEM_FONT}`
  etch(ctx, f, EMAIL, 72, TEX_H - 72, f.ink2)
  const site = 'ferjoo.github.io'
  etch(ctx, f, site, TEX_W - 72 - ctx.measureText(site).width, TEX_H - 72, f.ink2)
}

function canvasTexture(draw: (ctx: CanvasRenderingContext2D) => void, srgb: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = TEX_W
  canvas.height = TEX_H
  draw(canvas.getContext('2d')!)
  const texture = new THREE.CanvasTexture(canvas)
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

// Thousands of faint horizontal strokes: drives bump and roughness so light catches the "brushed" grain.
function useBrushedTexture() {
  return useMemo(
    () =>
      canvasTexture((ctx) => {
        ctx.fillStyle = '#808080'
        ctx.fillRect(0, 0, TEX_W, TEX_H)
        for (let i = 0; i < 2600; i++) {
          const y = Math.random() * TEX_H
          const shade = 110 + Math.random() * 40
          ctx.strokeStyle = `rgba(${shade},${shade},${shade},${0.25 + Math.random() * 0.35})`
          ctx.lineWidth = Math.random() < 0.85 ? 1 : 2
          ctx.beginPath()
          const x = Math.random() * TEX_W * 0.6
          ctx.moveTo(x, y)
          ctx.lineTo(x + TEX_W * (0.3 + Math.random() * 0.7), y)
          ctx.stroke()
        }
      }, false),
    [],
  )
}

function useFaces(t: Content, dark: boolean) {
  const [faces, setFaces] = useState<{ front: THREE.CanvasTexture; back: THREE.CanvasTexture } | null>(null)

  useEffect(() => {
    const f = finish(dark)
    const next = { front: canvasTexture((ctx) => drawFront(ctx, t, f), true), back: canvasTexture((ctx) => drawBack(ctx, t, f), true) }
    setFaces(next)
    return () => {
      next.front.dispose()
      next.back.dispose()
    }
  }, [t, dark])

  return faces
}

function Card({ t, dark }: { t: Content; dark: boolean }) {
  const group = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const faces = useFaces(t, dark)
  const brushed = useBrushedTexture()
  const { viewport } = useThree()
  const f = finish(dark)
  const scale = Math.min(1, viewport.width / (CARD_W + 0.5))

  useEffect(() => () => brushed.dispose(), [brushed])

  useFrame((_, delta) => {
    if (!group.current) return
    // Starts turned away and settles into place, so the card "arrives" on load.
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, flipped ? Math.PI : 0, 3.5, delta)
  })

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    // A drag that ends on the card should rotate it, not flip it.
    if (event.delta > 6) return
    setFlipped((value) => !value)
  }

  const face = (map: THREE.Texture) => (
    <meshPhysicalMaterial
      map={map}
      transparent
      metalness={f.metalness}
      roughness={0.32}
      roughnessMap={brushed}
      bumpMap={brushed}
      bumpScale={0.6}
      clearcoat={0.5}
      clearcoatRoughness={0.3}
      envMapIntensity={1.1}
    />
  )

  return (
    <group
      ref={group}
      scale={scale}
      rotation={[0, -Math.PI * 0.55, 0]}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      <RoundedBox args={[CARD_W, CARD_H, DEPTH]} radius={0.12} smoothness={10}>
        <meshPhysicalMaterial color={f.body} metalness={0.9} roughness={0.25} clearcoat={1} clearcoatRoughness={0.15} envMapIntensity={1.3} />
      </RoundedBox>
      {faces && (
        <>
          <mesh position={[0, 0, DEPTH / 2 + 0.0005]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            {face(faces.front)}
          </mesh>
          <mesh position={[0, 0, -DEPTH / 2 - 0.0005]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            {face(faces.back)}
          </mesh>
        </>
      )}
    </group>
  )
}

// A soft light that glides with the pointer, so a highlight sweeps across the metal.
function PointerSheen() {
  const light = useRef<THREE.PointLight>(null)
  useFrame((state, delta) => {
    if (!light.current) return
    light.current.position.x = THREE.MathUtils.damp(light.current.position.x, state.pointer.x * 4, 4, delta)
    light.current.position.y = THREE.MathUtils.damp(light.current.position.y, state.pointer.y * 2.5, 4, delta)
  })
  return <pointLight ref={light} position={[0, 0, 3.4]} intensity={3.2} distance={9} decay={1.6} color="#ffffff" />
}

export default function ProfileCard3D({ t, dark }: { t: Content; dark: boolean }) {
  return (
    <div className="relative h-full w-full">
      <p className="sr-only">
        Fernando Morales Ralda, {t.hero.role}. {t.card.back}: {t.card.stack.join(', ')}. {EMAIL}
      </p>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.2, 5.6], fov: 38 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
        <ambientLight intensity={dark ? 0.35 : 0.6} />
        <directionalLight position={[2.5, 4, 5]} intensity={dark ? 1.2 : 1.5} />
        <PointerSheen />
        {/* Studio reflections built from local light panels; nothing is downloaded. */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.5} position={[0, 4, 3]} scale={[10, 1.5, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer form="ring" intensity={0.8} position={[0, -3, 4]} scale={3} />
        </Environment>
        <PresentationControls global={false} cursor snap rotation={[0.12, -0.28, 0]} polar={[-0.4, 0.4]} azimuth={[-0.8, 0.8]}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
            <Card t={t} dark={dark} />
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -1.55, 0]} opacity={dark ? 0.7 : 0.32} scale={9} blur={2.8} far={3} />
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-xs text-ink-3">{t.card.flip}</p>
    </div>
  )
}
