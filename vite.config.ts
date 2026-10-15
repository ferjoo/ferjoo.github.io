import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from the root of ferjoo.github.io, so no custom base path is needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
