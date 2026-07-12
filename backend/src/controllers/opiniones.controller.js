const opinionModel = require('../models/opinion.model');

const getOpiniones = async (req, res, next) => {
  try {
    const opiniones = await opinionModel.getAllOpiniones();
    res.json(opiniones);
  } catch (error) {
    next(error);
  }
};

const getOpinion = async (req, res, next) => {
  try {
    const opinion = await opinionModel.getOpinionById(req.params.id);

    if (!opinion) {
      return res.status(404).json({
        mensaje: 'Opinión no encontrada'
      });
    }

    res.json(opinion);
  } catch (error) {
    next(error);
  }
};

const getOpinionesPorVendedor = async (req, res, next) => {
  try {
    const { vendedorId } = req.params;
    const { puntaje } = req.query;

    const opiniones = await opinionModel.getOpinionesPorVendedor(
      vendedorId,
      puntaje ? Number(puntaje) : null
    );

    res.json(opiniones);
  } catch (error) {
    next(error);
  }
};

const createOpinion = async (req, res, next) => {
  try {
    const nuevaOpinion = await opinionModel.createOpinion(req.body);

    res.status(201).json(nuevaOpinion);
  } catch (error) {
    next(error);
  }
};

const updateOpinion = async (req, res, next) => {
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
    next(error);
  }
};

const deleteOpinion = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = {
  getOpiniones,
  getOpinion,
  getOpinionesPorVendedor,
  createOpinion,
  updateOpinion,
  deleteOpinion
};