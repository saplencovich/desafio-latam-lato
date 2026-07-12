const express = require('express');
const router = express.Router();

const opinionesController = require('../controllers/opiniones.controller');
const verificarToken = require('../middlewares/auth.middleware');
const { validarOpinion } = require('../middlewares/validate.middleware');

router.get('/', opinionesController.getOpiniones);

router.get('/vendedor/:vendedorId', opinionesController.getOpinionesPorVendedor);

router.get('/:id', opinionesController.getOpinion);

router.post('/', verificarToken, validarOpinion, opinionesController.createOpinion);

router.put('/:id', verificarToken, validarOpinion, opinionesController.updateOpinion);

router.delete('/:id', verificarToken, opinionesController.deleteOpinion);

module.exports = router;