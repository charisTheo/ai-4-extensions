import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        sidepanel: 'index.html',
      },
    },
  },
  plugins: [
    react(),
    crx({ manifest }),
    eslint(),
  ]
})
