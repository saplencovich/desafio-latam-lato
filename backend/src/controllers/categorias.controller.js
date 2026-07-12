const categoriaModel = require('../models/categoria.model');

const getCategorias = async (req, res, next) => {
  try {
    const categorias = await categoriaModel.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

const getCategoria = async (req, res, next) => {
  try {
    const categoria = await categoriaModel.getCategoriaById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

const createCategoria = async (req, res, next) => {
  try {
    const { nombre } = req.body;

    const nuevaCategoria = await categoriaModel.createCategoria(nombre);

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    next(error);
  }
};

const updateCategoria = async (req, res, next) => {
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
    next(error);
  }
};

const deleteCategoria = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};