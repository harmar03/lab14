import * as albumes from '../../data/albumes.js'
import schema from './search.schema.js'

export const search = (req, res) => {
  const parsed = schema.safeParse(req.params)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message })
  }
  res.json(albumes.search(parsed.data.text))
}
