import * as albumes from '../../data/albumes.js'
import schema from './update.schema.js'

export const update = (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message })
  }
  const album = albumes.update(req.params.slug, parsed.data)
  if (!album) return res.status(404).json({ error: 'Album no encontrado' })
  res.json(album)
}
