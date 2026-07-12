function manejadorErrores(err, req, res, next) {
  console.error(err.stack || err);

  const status = err.status || 500;
  const mensaje = err.mensaje || err.message || 'Error interno del servidor';

  res.status(status).json({ mensaje });
}

module.exports = manejadorErrores;