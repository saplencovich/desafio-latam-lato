const categoriaModel = require('../models/categoria.model');

const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModel.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las categorías' });
  }
};

const getCategoria = async (req, res) => {
  try {
    const categoria = await categoriaModel.getCategoriaById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la categoría' });
  }
};

const createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevaCategoria = await categoriaModel.createCategoria(nombre);

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    const categoria = await categoriaModel.updateCategoria(
      req.params.id,
      nombre
    );

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const categoria = await categoriaModel.deleteCategoria(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json({
      mensaje: 'Categoría eliminada correctamente',
      categoria,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
  }
};

module.exports = {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};