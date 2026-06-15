const { DatabaseSync } = require('node:sqlite')
const path = require('path')
const fs = require('fs')

const DB_PATH    = path.join(__dirname, '..', 'discostore.db')
const DATOS_PATH = path.join(__dirname, '..', 'datos', 'albumes.json')

const db = new DatabaseSync(DB_PATH)

db.exec(`
  CREATE TABLE IF NOT EXISTS albumes (
    slug        TEXT PRIMARY KEY,
    titulo      TEXT NOT NULL,
    artista     TEXT NOT NULL,
    genero      TEXT NOT NULL,
    anio        INTEGER NOT NULL,
    sello       TEXT NOT NULL,
    pistas      INTEGER NOT NULL,
    imagen      TEXT,
    resumen     TEXT,
    descripcion TEXT
  )
`)

const { count } = db.prepare('SELECT COUNT(*) AS count FROM albumes').get()

if (count === 0) {
  const datos  = JSON.parse(fs.readFileSync(DATOS_PATH, 'utf8'))
  const stmt   = db.prepare(`
    INSERT INTO albumes (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
    VALUES (:slug, :titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :resumen, :descripcion)
  `)

  for (const album of datos) stmt.run(album)

  console.log(`BD poblada con ${datos.length} albumes.`)
}

module.exports = db
