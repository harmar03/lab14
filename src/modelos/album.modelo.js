const db = require('../db')

function generarSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function obtenerTodos() {
  return db.prepare('SELECT * FROM albumes').all()
}

function obtenerPorSlug(slug) {
  return db.prepare('SELECT * FROM albumes WHERE slug = ?').get(slug)
}

function obtenerPorGenero(genero) {
  return db
    .prepare('SELECT slug FROM albumes WHERE LOWER(genero) = LOWER(?)')
    .all(genero)
    .map((r) => r.slug)
}

function buscar(texto) {
  const patron = `%${texto}%`
  return db
    .prepare(
      `SELECT * FROM albumes
       WHERE titulo      LIKE ?
          OR artista     LIKE ?
          OR genero      LIKE ?
          OR sello       LIKE ?
          OR resumen     LIKE ?
          OR descripcion LIKE ?`
    )
    .all(patron, patron, patron, patron, patron, patron)
}

function crear(datos) {
  const slug = generarSlug(datos.titulo)

  if (obtenerPorSlug(slug)) return { error: 'conflict', slug }

  db.prepare(`
    INSERT INTO albumes (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
    VALUES (:slug, :titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :resumen, :descripcion)
  `).run({ slug, ...datos })

  return obtenerPorSlug(slug)
}

function actualizar(slug, datos) {
  if (!obtenerPorSlug(slug)) return null

  const actual = obtenerPorSlug(slug)
  const nuevo  = { ...actual, ...datos }

  db.prepare(`
    UPDATE albumes
    SET titulo = :titulo, artista = :artista, genero = :genero, anio = :anio,
        sello = :sello, pistas = :pistas, imagen = :imagen,
        resumen = :resumen, descripcion = :descripcion
    WHERE slug = :slug
  `).run({ ...nuevo, slug })

  return obtenerPorSlug(slug)
}

function eliminar(slug) {
  if (!obtenerPorSlug(slug)) return false
  db.prepare('DELETE FROM albumes WHERE slug = ?').run(slug)
  return true
}

module.exports = { obtenerTodos, obtenerPorSlug, obtenerPorGenero, buscar, crear, actualizar, eliminar }
