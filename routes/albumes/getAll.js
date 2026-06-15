import * as albumes from '../../data/albumes.js'

export const getAll = (req, res) => {
  res.json(albumes.getAll())
}
