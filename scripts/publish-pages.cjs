const { cpSync, copyFileSync, existsSync, mkdirSync, rmSync, readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { execSync } = require('node:child_process')

const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')
const indexPath = resolve(root, 'index.html')
const viteIndexPath = resolve(root, 'index.vite.html')
const assetsPath = resolve(root, 'assets')
const sourceMarker = '/src/main.js'

function ensureViteIndex() {
  if (!existsSync(viteIndexPath)) {
    const current = readFileSync(indexPath, 'utf8')
    if (!current.includes(sourceMarker)) {
      throw new Error('Missing index.vite.html and index.html is not the Vite source.')
    }
    copyFileSync(indexPath, viteIndexPath)
  }

  copyFileSync(viteIndexPath, indexPath)
}

ensureViteIndex()
execSync('npx vite build', { cwd: root, stdio: 'inherit' })

if (!existsSync(resolve(dist, 'index.html'))) {
  throw new Error('Build failed: dist/index.html not found.')
}

if (existsSync(assetsPath)) {
  rmSync(assetsPath, { recursive: true, force: true })
}
mkdirSync(assetsPath, { recursive: true })
cpSync(resolve(dist, 'assets'), assetsPath, { recursive: true })
copyFileSync(resolve(dist, 'index.html'), indexPath)

const staticDirs = ['css', 'img', 'vendor', 'js']
for (const dir of staticDirs) {
  const from = resolve(dist, dir)
  const to = resolve(root, dir)
  if (existsSync(from)) {
    cpSync(from, to, { recursive: true })
  }
}

console.log('Published dist/ to repo root for GitHub Pages.')
console.log('Commit and push: index.html, assets/, and any updated css/js/vendor/img.')
console.log('For local Vite again: npm run dev (restores index from index.vite.html).')
