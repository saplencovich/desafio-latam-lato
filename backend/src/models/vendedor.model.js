const pool = require('../config/db');

async function crearVendedor({ usuario_id, nombre_comercio, direccion, horario = null, despachos = null, telefono = null, email = null }) {
  const query = `
    INSERT INTO vendedores (usuario_id, nombre_comercio, direccion, horario, despachos, telefono, email)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, usuario_id, nombre_comercio, direccion, horario, despachos, telefono, email
  `;
  const values = [usuario_id, nombre_comercio, direccion, horario, despachos, telefono, email];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function buscarPorUsuarioId(usuario_id) {
  const query = `SELECT * FROM vendedores WHERE usuario_id = $1`;
  const { rows } = await pool.query(query, [usuario_id]);
  return rows[0] || null;
}

async function buscarPorId(id) {
  const query = `SELECT * FROM vendedores WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
}

async function actualizarVendedor(usuario_id, { nombre_comercio, direccion, horario, despachos, telefono, email }) {
  const query = `
    UPDATE vendedores
    SET nombre_comercio = COALESCE($2, nombre_comercio),
        direccion = COALESCE($3, direccion),
        horario = COALESCE($4, horario),
        despachos = COALESCE($5, despachos),
        telefono = COALESCE($6, telefono),
        email = COALESCE($7, email)
    WHERE usuario_id = $1
    RETURNING id, usuario_id, nombre_comercio, direccion, horario, despachos, telefono, email
  `;
  const values = [usuario_id, nombre_comercio, direccion, horario, despachos, telefono, email];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
}

async function eliminarVendedor(usuario_id) {
  const query = `DELETE FROM vendedores WHERE usuario_id = $1 RETURNING id`;
  const { rows } = await pool.query(query, [usuario_id]);
  return rows[0] || null;
}

module.exports = {
  crearVendedor,
  buscarPorUsuarioId,
  buscarPorId,
  actualizarVendedor,
  eliminarVendedor,
};