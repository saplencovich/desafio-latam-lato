const express = require('express');
const router = express.Router();

const categoriasController = require('../controllers/categorias.controller');
const { validarCategoria } = require('../middlewares/validate.middleware');

router.get('/', categoriasController.getCategorias);
router.get('/:id', categoriasController.getCategoria);
router.post('/', validarCategoria, categoriasController.createCategoria);
router.put('/:id', validarCategoria, categoriasController.updateCategoria);
router.delete('/:id', categoriasController.deleteCategoria);

module.exports = router;