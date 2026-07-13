const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuario.model');
const vendedorModel = require('../models/vendedor.model');

const SALT_ROUNDS = 10;

async function obtenerPerfil(req, res, next) {
  try {
    const { id, rol } = req.usuario;

    const usuario = await usuarioModel.buscarPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    let datosVendedor = null;
    if (rol === 'vendedor') {
      datosVendedor = await vendedorModel.buscarPorUsuarioId(id);
    }

    const user = {
      ...usuario,
      ...(datosVendedor && {
        nombre_comercio: datosVendedor.nombre_comercio,
        direccion: datosVendedor.direccion,
        horario: datosVendedor.horario,
        despachos: datosVendedor.despachos,
        telefono: datosVendedor.telefono,
      }),
    };

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function actualizarPerfil(req, res, next) {
  try {
    const { id } = req.usuario;
    const { nombre, foto_url } = req.body;

    const usuarioActualizado = await usuarioModel.actualizarUsuario(id, { nombre, foto_url });
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.status(200).json(usuarioActualizado);
  } catch (error) {
    next(error);
  }
}

async function actualizarEmail(req, res, next) {
  try {
    const { id } = req.usuario;
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ mensaje: 'Correo inválido' });
    }

    const existente = await usuarioModel.buscarPorEmail(email);
    if (existente && existente.id !== id) {
      return res.status(409).json({ mensaje: 'Ese correo ya está en uso' });
    }

    const actualizado = await usuarioModel.actualizarEmail(id, email);
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.status(200).json(actualizado);
  } catch (error) {
    next(error);
  }
}

async function cambiarPassword(req, res, next) {
  try {
    const { id } = req.usuario;
    const { passwordActual, passwordNueva } = req.body;

    if (!passwordActual || !passwordNueva) {
      return res.status(400).json({ mensaje: 'Debes ingresar la contraseña actual y la nueva' });
    }

    if (passwordNueva.length < 6) {
      return res.status(400).json({ mensaje: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    const usuario = await usuarioModel.buscarPorIdConPassword(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(passwordActual, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'La contraseña actual es incorrecta' });
    }

    const nuevoHash = await bcrypt.hash(passwordNueva, SALT_ROUNDS);
    await usuarioModel.actualizarPassword(id, nuevoHash);

    return res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    next(error);
  }
}

async function eliminarCuenta(req, res, next) {
  try {
    const { id } = req.usuario;

    const usuarioEliminado = await usuarioModel.eliminarUsuario(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Cuenta eliminada correctamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
  actualizarEmail,
  cambiarPassword,
  eliminarCuenta,
};