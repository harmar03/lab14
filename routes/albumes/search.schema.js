import { z } from 'zod'

const schema = z.object({
  text: z.string().trim().min(1, 'El texto de busqueda es obligatorio')
})

export default schema
