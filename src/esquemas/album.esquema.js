const { z } = require('zod')

const albumEsquema = z.object({
  titulo:      z.string().min(1, 'El titulo es obligatorio'),
  artista:     z.string().min(1, 'El artista es obligatorio'),
  genero:      z.string().min(1, 'El genero es obligatorio'),
  anio:        z.number().int().min(1900).max(new Date().getFullYear()),
  sello:       z.string().min(1, 'El sello es obligatorio'),
  pistas:      z.number().int().min(1),
  imagen:      z.string().optional(),
  resumen:     z.string().optional(),
  descripcion: z.string().optional()
})

const albumActualizarEsquema = albumEsquema.partial()

module.exports = { albumEsquema, albumActualizarEsquema }
