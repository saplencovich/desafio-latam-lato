function validarCategoria(req, res, next) {
  const { nombre } = req.body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({
      mensaje: 'El nombre de la categoría es obligatorio'
    });
  }

  if (nombre.trim().length > 100) {
    return res.status(400).json({
      mensaje: 'El nombre de la categoría no puede superar los 100 caracteres'
    });
  }

  next();
}

function validarPublicacion(req, res, next) {
  const {
    usuario_id,
    categoria_id,
    titulo,
    descripcion,
    precio,
    stock,
    imagen_url
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

  if (typeof titulo !== 'string' || titulo.trim().length < 3 || titulo.trim().length > 150) {
    return res.status(400).json({
      mensaje: 'El título debe tener entre 3 y 150 caracteres'
    });
  }

  if (descripcion !== undefined && descripcion !== null && typeof descripcion !== 'string') {
    return res.status(400).json({
      mensaje: 'La descripción debe ser un texto'
    });
  }

  if (isNaN(Number(precio)) || Number(precio) <= 0) {
    return res.status(400).json({
      mensaje: 'El precio debe ser un número mayor a 0'
    });
  }

  if (isNaN(Number(stock)) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
    return res.status(400).json({
      mensaje: 'El stock debe ser un número entero mayor o igual a 0'
    });
  }

  if (isNaN(Number(categoria_id)) || Number(categoria_id) <= 0) {
    return res.status(400).json({
      mensaje: 'La categoría seleccionada no es válida'
    });
  }

  if (isNaN(Number(usuario_id)) || Number(usuario_id) <= 0) {
    return res.status(400).json({
      mensaje: 'El usuario no es válido'
    });
  }

  if (imagen_url && typeof imagen_url === 'string' && imagen_url.trim() !== '') {
    try {
      new URL(imagen_url);
    } catch {
      return res.status(400).json({
        mensaje: 'La URL de la imagen no es válida'
      });
    }
  }

  next();
}

function validarOpinion(req, res, next) {
  const {
    autor_id,
    vendedor_id,
    puntaje,
    comentario
  } = req.body;

  if (!autor_id || !vendedor_id || puntaje === undefined) {
    return res.status(400).json({
      mensaje: 'Faltan datos obligatorios'
    });
  }

  if (isNaN(Number(puntaje)) || Number(puntaje) < 1 || Number(puntaje) > 5) {
    return res.status(400).json({
      mensaje: 'El puntaje debe estar entre 1 y 5'
    });
  }

  if (comentario !== undefined && comentario !== null) {
    if (typeof comentario !== 'string') {
      return res.status(400).json({
        mensaje: 'El comentario debe ser un texto'
      });
    }
    if (comentario.length > 500) {
      return res.status(400).json({
        mensaje: 'El comentario no puede superar los 500 caracteres'
      });
    }
  }

  next();
}

module.exports = {
  validarCategoria,
  validarPublicacion,
  validarOpinion
};