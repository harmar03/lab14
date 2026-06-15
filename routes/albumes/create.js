import * as albumes from '../../data/albumes.js'
import schema from './create.schema.js'

export const create = (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message })
  }
  const album = albumes.create(parsed.data)
  if (album.error === 'conflict') {
    return res.status(409).json({ error: `Ya existe un album con el slug "${album.slug}"` })
  }
  res.status(201).location(`/album/${album.slug}`).json(album)
}
