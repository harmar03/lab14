import { z } from 'zod'

const schema = z.object({
  titulo:      z.string().min(1).optional(),
  artista:     z.string().min(1).optional(),
  genero:      z.string().min(1).optional(),
  anio:        z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  sello:       z.string().min(1).optional(),
  pistas:      z.number().int().min(1).optional(),
  imagen:      z.string().optional(),
  resumen:     z.string().optional(),
  descripcion: z.string().optional()
})

export default schema
