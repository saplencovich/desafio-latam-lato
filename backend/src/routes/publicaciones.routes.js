const express = require('express');
const router = express.Router();

const publicacionesController = require('../controllers/publicaciones.controller');
const verificarToken = require('../middlewares/auth.middleware');
const { validarPublicacion } = require('../middlewares/validate.middleware');

router.get('/', publicacionesController.getPublicaciones);

router.get('/:id', publicacionesController.getPublicacion);

router.post('/', verificarToken, validarPublicacion, publicacionesController.createPublicacion);

router.put('/:id', verificarToken, validarPublicacion, publicacionesController.updatePublicacion);

router.delete('/:id', verificarToken, publicacionesController.deletePublicacion);

module.exports = router;