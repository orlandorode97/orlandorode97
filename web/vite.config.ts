import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://orlandorode97.github.io/orlandorode97/ (project pages),
// so the base path must match the repo name.
export default defineConfig({
  base: '/orlandorode97/',
  plugins: [react(), tailwindcss()],
})
