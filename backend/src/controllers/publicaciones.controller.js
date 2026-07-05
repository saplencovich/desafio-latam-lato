const publicacionModel = require('../models/publicacion.model');

const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await publicacionModel.getAllPublicaciones();
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las publicaciones'
    });
  }
};

const getPublicacion = async (req, res) => {
  try {
    const publicacion = await publicacionModel.getPublicacionById(req.params.id);

    if (!publicacion) {
      return res.status(404).json({
        mensaje: 'Publicación no encontrada'
      });
    }

    res.json(publicacion);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener la publicación'
    });
  }
};

const createPublicacion = async (req, res) => {
  try {
    const nuevaPublicacion = await publicacionModel.createPublicacion(req.body);

    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la publicación'
    });
  }
};

const updatePublicacion = async (req, res) => {
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
    res.status(500).json({
      mensaje: 'Error al actualizar la publicación'
    });
  }
};

const deletePublicacion = async (req, res) => {
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
    res.status(500).json({
      mensaje: 'Error al eliminar la publicación'
    });
  }
};

module.exports = {
  getPublicaciones,
  getPublicacion,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
};