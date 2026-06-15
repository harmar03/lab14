import * as albumes from '../../data/albumes.js'

export const getByGenero = (req, res) => {
  res.json(albumes.getByGenero(req.params.genero))
}
