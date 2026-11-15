const { copyFileSync, existsSync, readFileSync } = require('node:fs')
const { resolve } = require('node:path')

const root = resolve(__dirname, '..')
const indexPath = resolve(root, 'index.html')
const viteIndexPath = resolve(root, 'index.vite.html')
const sourceMarker = '/src/main.js'

if (!existsSync(viteIndexPath)) {
  console.error('Missing index.vite.html (Vite source entry).')
  process.exit(1)
}

const current = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : ''
if (!current.includes(sourceMarker)) {
  copyFileSync(viteIndexPath, indexPath)
  console.log('Restored index.html from index.vite.html')
}
