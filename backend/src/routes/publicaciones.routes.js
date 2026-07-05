const express = require('express');
const router = express.Router();

const publicacionesController = require('../controllers/publicaciones.controller');

router.get('/', publicacionesController.getPublicaciones);

router.get('/:id', publicacionesController.getPublicacion);

router.post('/', publicacionesController.createPublicacion);

router.put('/:id', publicacionesController.updatePublicacion);

router.delete('/:id', publicacionesController.deletePublicacion);

module.exports = router;