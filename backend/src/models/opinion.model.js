const pool = require('../config/db');

const getAllOpiniones = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM opiniones ORDER BY id'
  );
  return rows;
};

const getOpinionById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM opiniones WHERE id = $1',
    [id]
  );
  return rows[0];
};

const createOpinion = async (opinion) => {
  const {
    autor_id,
    vendedor_id,
    puntaje,
    comentario
  } = opinion;

  const { rows } = await pool.query(
    `INSERT INTO opiniones
    (autor_id, vendedor_id, puntaje, comentario)
    VALUES ($1,$2,$3,$4)
    RETURNING *`,
    [
      autor_id,
      vendedor_id,
      puntaje,
      comentario
    ]
  );

  return rows[0];
};

const updateOpinion = async (id, opinion) => {
  const {
    puntaje,
    comentario
  } = opinion;

  const { rows } = await pool.query(
    `UPDATE opiniones
     SET puntaje = $1,
         comentario = $2
     WHERE id = $3
     RETURNING *`,
    [
      puntaje,
      comentario,
      id
    ]
  );

  return rows[0];
};

const deleteOpinion = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM opiniones WHERE id = $1 RETURNING *',
    [id]
  );

  return rows[0];
};

module.exports = {
  getAllOpiniones,
  getOpinionById,
  createOpinion,
  updateOpinion,
  deleteOpinion
};