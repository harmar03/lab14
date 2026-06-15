import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { getAll }      from './routes/albumes/getAll.js'
import { getBySlug }   from './routes/albumes/getBySlug.js'
import { getByGenero } from './routes/albumes/getByGenero.js'
import { search }      from './routes/albumes/search.js'
import { create }      from './routes/albumes/create.js'
import { update }      from './routes/albumes/update.js'
import { remove }      from './routes/albumes/delete.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    nombre:      'DiscoStore API',
    version:     '1.0.0',
    descripcion: 'API REST para el catalogo de albumes musicales'
  })
})

app.use('/imagenes', express.static(join(__dirname, 'public')))

app.get('/albumes',         getAll)
app.get('/album/:slug',     getBySlug)
app.get('/genero/:genero',  getByGenero)
app.get('/search/:text',    search)
app.post('/albumes',        create)
app.put('/album/:slug',     update)
app.delete('/album/:slug',  remove)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`DiscoStore corriendo en http://${HOST}:${PORT}`)
})
