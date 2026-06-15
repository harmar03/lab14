require('dotenv').config()

const app = require('./app')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`DiscoStore corriendo en http://${HOST}:${PORT}`)
})
