const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const verificarToken = require('../middlewares/auth.middleware');

router.get('/perfil', verificarToken, usuariosController.obtenerPerfil);
router.put('/perfil', verificarToken, usuariosController.actualizarPerfil);
router.put('/perfil/email', verificarToken, usuariosController.actualizarEmail);
router.put('/perfil/password', verificarToken, usuariosController.cambiarPassword);
router.delete('/perfil', verificarToken, usuariosController.eliminarCuenta);

module.exports = router;