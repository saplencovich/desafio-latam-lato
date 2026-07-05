const pool = require('../config/db');

const getAllPublicaciones = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM publicaciones ORDER BY id`
  );
  return rows;
};

const getPublicacionById = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM publicaciones WHERE id = $1`,
    [id]
  );
  return rows[0];
};

const createPublicacion = async (publicacion) => {
  const {
    usuario_id,
    categoria_id,
    titulo,
    descripcion,
    precio,
    stock,
    imagen_url,
    origen,
    tueste
  } = publicacion;

  const { rows } = await pool.query(
    `INSERT INTO publicaciones
    (usuario_id, categoria_id, titulo, descripcion, precio, stock, imagen_url, origen, tueste)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *`,
    [
      usuario_id,
      categoria_id,
      titulo,
      descripcion,
      precio,
      stock,
      imagen_url,
      origen,
      tueste
    ]
  );

  return rows[0];
};

const updatePublicacion = async (id, publicacion) => {
  const {
    categoria_id,
    titulo,
    descripcion,
    precio,
    stock,
    imagen_url,
    origen,
    tueste
  } = publicacion;

  const { rows } = await pool.query(
    `UPDATE publicaciones
     SET categoria_id=$1,
         titulo=$2,
         descripcion=$3,
         precio=$4,
         stock=$5,
         imagen_url=$6,
         origen=$7,
         tueste=$8
     WHERE id=$9
     RETURNING *`,
    [
      categoria_id,
      titulo,
      descripcion,
      precio,
      stock,
      imagen_url,
      origen,
      tueste,
      id
    ]
  );

  return rows[0];
};

const deletePublicacion = async (id) => {
  const { rows } = await pool.query(
    `DELETE FROM publicaciones WHERE id=$1 RETURNING *`,
    [id]
  );

  return rows[0];
};

module.exports = {
  getAllPublicaciones,
  getPublicacionById,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
};