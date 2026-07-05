function validarCategoria(req, res, next) {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({
      mensaje: 'El nombre de la categoría es obligatorio'
    });
  }

  next();
}

function validarPublicacion(req, res, next) {
  const {
    usuario_id,
    categoria_id,
    titulo,
    precio,
    stock
  } = req.body;

  if (
    !usuario_id ||
    !categoria_id ||
    !titulo ||
    precio === undefined ||
    stock === undefined
  ) {
    return res.status(400).json({
      mensaje: 'Faltan datos obligatorios'
    });
  }

  next();
}

function validarOpinion(req, res, next) {
  const {
    autor_id,
    vendedor_id,
    puntaje
  } = req.body;

  if (!autor_id || !vendedor_id || !puntaje) {
    return res.status(400).json({
      mensaje: 'Faltan datos obligatorios'
    });
  }

  if (puntaje < 1 || puntaje > 5) {
    return res.status(400).json({
      mensaje: 'El puntaje debe estar entre 1 y 5'
    });
  }

  next();
}

module.exports = {
  validarCategoria,
  validarPublicacion,
  validarOpinion
};