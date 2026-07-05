const opinionModel = require('../models/opinion.model');

const getOpiniones = async (req, res) => {
  try {
    const opiniones = await opinionModel.getAllOpiniones();
    res.json(opiniones);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las opiniones'
    });
  }
};

const getOpinion = async (req, res) => {
  try {
    const opinion = await opinionModel.getOpinionById(req.params.id);

    if (!opinion) {
      return res.status(404).json({
        mensaje: 'Opinión no encontrada'
      });
    }

    res.json(opinion);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener la opinión'
    });
  }
};

const createOpinion = async (req, res) => {
  try {
    const nuevaOpinion = await opinionModel.createOpinion(req.body);

    res.status(201).json(nuevaOpinion);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la opinión'
    });
  }
};

const updateOpinion = async (req, res) => {
  try {
    const opinion = await opinionModel.updateOpinion(
      req.params.id,
      req.body
    );

    if (!opinion) {
      return res.status(404).json({
        mensaje: 'Opinión no encontrada'
      });
    }

    res.json(opinion);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar la opinión'
    });
  }
};

const deleteOpinion = async (req, res) => {
  try {
    const opinion = await opinionModel.deleteOpinion(req.params.id);

    if (!opinion) {
      return res.status(404).json({
        mensaje: 'Opinión no encontrada'
      });
    }

    res.json({
      mensaje: 'Opinión eliminada correctamente',
      opinion
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar la opinión'
    });
  }
};

module.exports = {
  getOpiniones,
  getOpinion,
  createOpinion,
  updateOpinion,
  deleteOpinion
};