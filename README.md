# Portafolio — Fernando Morales Ralda

Sitio personal publicado en **https://ferjoo.github.io**. Es estático (Vite + React + TypeScript + Tailwind) y lo sirve GitHub Pages: no hay servidor que mantener.

## Cómo se actualiza

Todo cambio que llegue a `main` dispara `.github/workflows/deploy.yml`, que construye el sitio y lo publica en GitHub Pages.

## Dónde editar

| Qué | Archivo |
|-----|---------|
| Textos del sitio (inglés y español) | `src/content.ts` |
| Diseño y secciones | `src/App.tsx`, `src/index.css` |

## Desarrollo local

```bash
pnpm install --frozen-lockfile
pnpm dev
```
