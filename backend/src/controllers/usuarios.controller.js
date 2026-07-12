const usuarioModel = require('../models/usuario.model');
const vendedorModel = require('../models/vendedor.model');

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
  eliminarCuenta,
};