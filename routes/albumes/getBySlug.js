import * as albumes from '../../data/albumes.js'

export const getBySlug = (req, res) => {
  const album = albumes.getBySlug(req.params.slug)
  if (!album) return res.status(404).json({ error: 'Album no encontrado' })
  res.json(album)
}
