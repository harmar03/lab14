const { Router } = require('express')
const ctrl = require('../controladores/album.controlador')

const router = Router()

router.get('/albumes',        ctrl.listar)
router.get('/album/:slug',    ctrl.obtener)
router.get('/genero/:genero', ctrl.porGenero)
router.get('/search/:text',   ctrl.buscar)

router.post('/albumes',       ctrl.crear)
router.put('/album/:slug',    ctrl.actualizar)
router.delete('/album/:slug', ctrl.eliminar)

module.exports = router
