const express = require('express');
const router = express.Router();

const opinionesController = require('../controllers/opiniones.controller');

router.get('/', opinionesController.getOpiniones);

router.get('/:id', opinionesController.getOpinion);

router.post('/', opinionesController.createOpinion);

router.put('/:id', opinionesController.updateOpinion);

router.delete('/:id', opinionesController.deleteOpinion);

module.exports = router;