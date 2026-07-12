const vendedorModel = require('../models/vendedor.model');

async function obtenerVendedor(req, res, next) {
  try {
    const { id } = req.params;

    const vendedor = await vendedorModel.buscarPorId(id);
    if (!vendedor) {
      return res.status(404).json({ mensaje: 'Vendedor no encontrado' });
    }

    return res.status(200).json(vendedor);
  } catch (error) {
    next(error);
  }
}

async function actualizarDatosComercio(req, res, next) {
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
    next(error);
  }
}

module.exports = {
  obtenerVendedor,
  actualizarDatosComercio,
};