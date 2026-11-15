import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const staticDirs = ['css', 'img', 'vendor', 'js']

function copyStaticToDist() {
  return {
    name: 'copy-static-to-dist',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true })
      }

      for (const dir of staticDirs) {
        const from = resolve(__dirname, dir)
        const to = resolve(outDir, dir)
        if (existsSync(from)) {
          cpSync(from, to, { recursive: true })
        }
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [vue(), copyStaticToDist()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
})
