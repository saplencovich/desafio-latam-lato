const publicacionModel = require('../models/publicacion.model');

const getPublicaciones = async (req, res, next) => {
  try {
    const publicaciones = await publicacionModel.getAllPublicaciones();
    res.json(publicaciones);
  } catch (error) {
    next(error);
  }
};

const getPublicacion = async (req, res, next) => {
  try {
    const publicacion = await publicacionModel.getPublicacionById(req.params.id);

    if (!publicacion) {
      return res.status(404).json({
        mensaje: 'Publicación no encontrada'
      });
    }

    res.json(publicacion);
  } catch (error) {
    next(error);
  }
};

const createPublicacion = async (req, res, next) => {
  try {
    const nuevaPublicacion = await publicacionModel.createPublicacion(req.body);

    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    next(error);
  }
};

const updatePublicacion = async (req, res, next) => {
  try {
    const publicacion = await publicacionModel.updatePublicacion(
      req.params.id,
      req.body
    );

    if (!publicacion) {
      return res.status(404).json({
        mensaje: 'Publicación no encontrada'
      });
    }

    res.json(publicacion);
  } catch (error) {
    next(error);
  }
};

const deletePublicacion = async (req, res, next) => {
  try {
    const publicacion = await publicacionModel.deletePublicacion(req.params.id);

    if (!publicacion) {
      return res.status(404).json({
        mensaje: 'Publicación no encontrada'
      });
    }

    res.json({
      mensaje: 'Publicación eliminada correctamente',
      publicacion
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicaciones,
  getPublicacion,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
};