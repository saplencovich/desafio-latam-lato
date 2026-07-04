const pool = require('../config/db');

async function crearUsuario({ nombre, email, password, rol, foto_url = null }) {
  const query = `
    INSERT INTO usuarios (nombre, email, password, rol, foto_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nombre, email, rol, foto_url, created_at
  `;
  const values = [nombre, email, password, rol, foto_url];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function buscarPorEmail(email) {
  const query = `SELECT * FROM usuarios WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
}

async function buscarPorId(id) {
  const query = `
    SELECT id, nombre, email, rol, foto_url, created_at
    FROM usuarios
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
}

async function actualizarUsuario(id, { nombre, foto_url }) {
  const query = `
    UPDATE usuarios
    SET nombre = COALESCE($2, nombre),
        foto_url = COALESCE($3, foto_url)
    WHERE id = $1
    RETURNING id, nombre, email, rol, foto_url, created_at
  `;
  const { rows } = await pool.query(query, [id, nombre, foto_url]);
  return rows[0] || null;
}

async function eliminarUsuario(id) {
  const query = `DELETE FROM usuarios WHERE id = $1 RETURNING id`;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
}

module.exports = {
  crearUsuario,
  buscarPorEmail,
  buscarPorId,
  actualizarUsuario,
  eliminarUsuario,
};