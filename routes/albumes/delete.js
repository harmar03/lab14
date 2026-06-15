import * as albumes from '../../data/albumes.js'

export const remove = (req, res) => {
  const eliminado = albumes.remove(req.params.slug)
  if (!eliminado) return res.status(404).json({ error: 'Album no encontrado' })
  res.status(204).send()
}
