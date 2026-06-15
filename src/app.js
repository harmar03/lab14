const express = require('express')
const path    = require('path')

const ctrl        = require('./controladores/album.controlador')
const albumRutas  = require('./rutas/album.rutas')

const app = express()

app.use(express.json())

app.get('/', ctrl.info)
app.use('/imagenes', express.static(path.join(__dirname, '..', 'imagenes')))
app.use('/', albumRutas)

module.exports = app
