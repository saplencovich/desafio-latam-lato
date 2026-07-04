const vendedorModel = require('../models/vendedor.model');

async function obtenerVendedor(req, res) {
  try {
    const { id } = req.params;

    const vendedor = await vendedorModel.buscarPorId(id);
    if (!vendedor) {
      return res.status(404).json({ mensaje: 'Vendedor no encontrado' });
    }

    return res.status(200).json(vendedor);
  } catch (error) {
    console.error('Error al obtener vendedor:', error);
    return res.status(500).json({ mensaje: 'Error interno al obtener el vendedor' });
  }
}

async function actualizarDatosComercio(req, res) {
  try {
    const { id, rol } = req.usuario;

    if (rol !== 'vendedor') {
      return res.status(403).json({ mensaje: 'Solo los vendedores pueden editar datos de comercio' });
    }

    const { nombre_comercio, direccion, horario, despachos, telefono, email } = req.body;

    const vendedorActualizado = await vendedorModel.actualizarVendedor(id, {
      nombre_comercio,
      direccion,
      horario,
      despachos,
      telefono,
      email,
    });

    if (!vendedorActualizado) {
      return res.status(404).json({ mensaje: 'Vendedor no encontrado' });
    }

    return res.status(200).json(vendedorActualizado);
  } catch (error) {
    console.error('Error al actualizar datos de comercio:', error);
    return res.status(500).json({ mensaje: 'Error interno al actualizar el comercio' });
  }
}

module.exports = {
  obtenerVendedor,
  actualizarDatosComercio,
};