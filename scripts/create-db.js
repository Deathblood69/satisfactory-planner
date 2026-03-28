// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Usage: node create-db.js <source-json-file>')
  process.exit(1)
}

const sourceFile = path.resolve(args[0])
const targetFile = path.resolve('db.json')

if (!fs.existsSync(sourceFile)) {
  console.error('Erreur: le fichier source n’existe pas:', sourceFile)
  process.exit(1)
}

// Supprimer l’ancien db.json s’il existe
if (fs.existsSync(targetFile)) {
  fs.unlinkSync(targetFile)
  console.log('Ancien db.json supprimé')
}

// Copier le fichier
fs.copyFileSync(sourceFile, targetFile)
console.log('db.json créé à partir de', sourceFile)
