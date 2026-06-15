const modelo = require('../modelos/album.modelo')
const { albumEsquema, albumActualizarEsquema } = require('../esquemas/album.esquema')

function info(req, res) {
  res.json({
    nombre:      'DiscoStore API',
    version:     '1.0.0',
    descripcion: 'API REST para el catalogo de albumes musicales',
    rutas: {
      'GET  /':               'Informacion de la API',
      'GET  /albumes':        'Lista todos los albumes',
      'GET  /album/:slug':    'Obtiene un album por slug',
      'GET  /genero/:genero': 'Slugs de albumes por genero',
      'GET  /search/:text':   'Busca albumes por texto',
      'POST /albumes':        'Crea un nuevo album',
      'PUT  /album/:slug':    'Actualiza un album',
      'DELETE /album/:slug':  'Elimina un album'
    }
  })
}

function listar(req, res) {
  res.json(modelo.obtenerTodos())
}

function obtener(req, res) {
  const album = modelo.obtenerPorSlug(req.params.slug)
  if (!album) return res.status(404).json({ error: 'Album no encontrado' })
  res.json(album)
}

function porGenero(req, res) {
  res.json(modelo.obtenerPorGenero(req.params.genero))
}

function buscar(req, res) {
  res.json(modelo.buscar(req.params.text))
}

function crear(req, res) {
  const resultado = albumEsquema.safeParse(req.body)
  if (!resultado.success) {
    return res.status(400).json({ error: 'Datos invalidos', detalles: resultado.error.errors })
  }

  const album = modelo.crear(resultado.data)
  if (album.error === 'conflict') {
    return res.status(409).json({ error: `Ya existe un album con el slug "${album.slug}"` })
  }

  res.status(201).location(`/album/${album.slug}`).json(album)
}

function actualizar(req, res) {
  const resultado = albumActualizarEsquema.safeParse(req.body)
  if (!resultado.success) {
    return res.status(400).json({ error: 'Datos invalidos', detalles: resultado.error.errors })
  }

  const album = modelo.actualizar(req.params.slug, resultado.data)
  if (!album) return res.status(404).json({ error: 'Album no encontrado' })
  res.json(album)
}

function eliminar(req, res) {
  const eliminado = modelo.eliminar(req.params.slug)
  if (!eliminado) return res.status(404).json({ error: 'Album no encontrado' })
  res.status(204).send()
}

module.exports = { info, listar, obtener, porGenero, buscar, crear, actualizar, eliminar }
