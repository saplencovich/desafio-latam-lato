const usuarioModel = require('../models/usuario.model');
const vendedorModel = require('../models/vendedor.model');

async function obtenerPerfil(req, res) {
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
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ mensaje: 'Error interno al obtener el perfil' });
  }
}

async function actualizarPerfil(req, res) {
  try {
    const { id } = req.usuario;
    const { nombre, foto_url } = req.body;

    const usuarioActualizado = await usuarioModel.actualizarUsuario(id, { nombre, foto_url });
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return res.status(500).json({ mensaje: 'Error interno al actualizar el perfil' });
  }
}

async function eliminarCuenta(req, res) {
  try {
    const { id } = req.usuario;

    const usuarioEliminado = await usuarioModel.eliminarUsuario(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Cuenta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar cuenta:', error);
    return res.status(500).json({ mensaje: 'Error interno al eliminar la cuenta' });
  }
}

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
  eliminarCuenta,
};