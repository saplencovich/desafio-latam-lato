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

const getOpinionesPorVendedor = async (vendedorId, puntaje) => {
  const condiciones = ['o.vendedor_id = $1'];
  const valores = [vendedorId];

  if (puntaje) {
    valores.push(puntaje);
    condiciones.push(`o.puntaje = $${valores.length}`);
  }

  const { rows } = await pool.query(
    `SELECT
      o.id,
      o.autor_id,
      o.vendedor_id,
      o.puntaje,
      o.comentario,
      o.created_at,
      u.nombre AS autor_nombre
    FROM opiniones o
    JOIN usuarios u ON u.id = o.autor_id
    WHERE ${condiciones.join(' AND ')}
    ORDER BY o.created_at DESC`,
    valores
  );

  return rows;
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
  getOpinionesPorVendedor,
  createOpinion,
  updateOpinion,
  deleteOpinion
};