const pool = require('../config/db');

const getAllPublicaciones = async () => {
  const { rows } = await pool.query(`
    SELECT
      p.id,
      p.usuario_id,
      p.categoria_id,
      c.nombre AS categoria,
      p.titulo,
      p.descripcion,
      p.precio,
      p.stock,
      p.imagen_url,
      p.origen,
      p.tueste,
      p.created_at,
      json_build_object(
        'nombre_comercio', v.nombre_comercio,
        'direccion', v.direccion,
        'horario', v.horario,
        'despachos', v.despachos,
        'telefono', v.telefono,
        'email', v.email,
        'reputacion', COALESCE(op.promedio, 0)
      ) AS vendedor
    FROM publicaciones p
    JOIN categorias c ON c.id = p.categoria_id
    LEFT JOIN vendedores v ON v.usuario_id = p.usuario_id
    LEFT JOIN (
      SELECT vendedor_id, ROUND(AVG(puntaje), 1) AS promedio
      FROM opiniones
      GROUP BY vendedor_id
    ) op ON op.vendedor_id = p.usuario_id
    ORDER BY p.id
  `);
  return rows;
};

const getPublicacionById = async (id) => {
  const { rows } = await pool.query(`
    SELECT
      p.id,
      p.usuario_id,
      p.categoria_id,
      c.nombre AS categoria,
      p.titulo,
      p.descripcion,
      p.precio,
      p.stock,
      p.imagen_url,
      p.origen,
      p.tueste,
      p.created_at,
      json_build_object(
        'nombre_comercio', v.nombre_comercio,
        'direccion', v.direccion,
        'horario', v.horario,
        'despachos', v.despachos,
        'telefono', v.telefono,
        'email', v.email,
        'reputacion', COALESCE(op.promedio, 0)
      ) AS vendedor
    FROM publicaciones p
    JOIN categorias c ON c.id = p.categoria_id
    LEFT JOIN vendedores v ON v.usuario_id = p.usuario_id
    LEFT JOIN (
      SELECT vendedor_id, ROUND(AVG(puntaje), 1) AS promedio
      FROM opiniones
      GROUP BY vendedor_id
    ) op ON op.vendedor_id = p.usuario_id
    WHERE p.id = $1
  `, [id]);
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