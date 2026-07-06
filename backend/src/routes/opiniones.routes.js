const express = require('express');
const router = express.Router();

const opinionesController = require('../controllers/opiniones.controller');
const { validarOpinion } = require('../middlewares/validate.middleware');

router.get('/', opinionesController.getOpiniones);

router.get('/:id', opinionesController.getOpinion);

router.post('/', validarOpinion, opinionesController.createOpinion);

router.put('/:id', validarOpinion, opinionesController.updateOpinion);

router.delete('/:id', opinionesController.deleteOpinion);

module.exports = router;