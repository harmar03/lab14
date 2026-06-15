import { DatabaseSync } from 'node:sqlite'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const db = new DatabaseSync(join(__dirname, 'albumes.db'))

const sql = readFileSync(join(__dirname, 'CREATE.SQL'), 'utf-8')
db.exec(sql)

const { count } = db.prepare('SELECT COUNT(*) AS count FROM albumes').get()
if (count === 0) {
  const datos = JSON.parse(readFileSync(join(__dirname, 'albumes.json'), 'utf-8'))
  const stmt = db.prepare(`
    INSERT INTO albumes (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
    VALUES (:slug, :titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :resumen, :descripcion)
  `)
  for (const album of datos) stmt.run(album)
  console.log(`BD poblada con ${datos.length} albumes.`)
}

function generarSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const getAll = () =>
  db.prepare('SELECT * FROM albumes').all()

export const getBySlug = (slug) =>
  db.prepare('SELECT * FROM albumes WHERE slug = ?').get(slug)

export const getByGenero = (genero) =>
  db.prepare('SELECT slug FROM albumes WHERE LOWER(genero) = LOWER(?)').all(genero).map(r => r.slug)

export const search = (texto) => {
  const p = `%${texto}%`
  return db.prepare(`
    SELECT * FROM albumes
    WHERE titulo LIKE ? OR artista LIKE ? OR genero LIKE ?
       OR sello  LIKE ? OR resumen LIKE ? OR descripcion LIKE ?
  `).all(p, p, p, p, p, p)
}

export const create = (datos) => {
  const slug = generarSlug(datos.titulo)
  if (getBySlug(slug)) return { error: 'conflict', slug }
  db.prepare(`
    INSERT INTO albumes (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
    VALUES (:slug, :titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :resumen, :descripcion)
  `).run({ slug, ...datos })
  return getBySlug(slug)
}

export const update = (slug, datos) => {
  const actual = getBySlug(slug)
  if (!actual) return null
  const nuevo = { ...actual, ...datos }
  db.prepare(`
    UPDATE albumes
    SET titulo=:titulo, artista=:artista, genero=:genero, anio=:anio,
        sello=:sello, pistas=:pistas, imagen=:imagen, resumen=:resumen, descripcion=:descripcion
    WHERE slug=:slug
  `).run({ ...nuevo, slug })
  return getBySlug(slug)
}

export const remove = (slug) => {
  if (!getBySlug(slug)) return false
  db.prepare('DELETE FROM albumes WHERE slug = ?').run(slug)
  return true
}
