const express = require('express');
const router = express.Router();
const vendedoresController = require('../controllers/vendedores.controller');
const verificarToken = require('../middlewares/auth.middleware');

router.get('/:id', vendedoresController.obtenerVendedor);
router.put('/comercio', verificarToken, vendedoresController.actualizarDatosComercio);

module.exports = router;