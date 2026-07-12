const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');
const vendedorModel = require('../models/vendedor.model');

const SALT_ROUNDS = 10;

function generarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

async function registro(req, res, next) {
  try {
    const { nombre, email, password, rol, nombre_comercio, direccion } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    if (rol === 'vendedor' && (!nombre_comercio || !direccion)) {
      return res.status(400).json({ mensaje: 'Los vendedores deben ingresar nombre_comercio y direccion' });
    }

    const usuarioExistente = await usuarioModel.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'Ya existe una cuenta con ese correo' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const nuevoUsuario = await usuarioModel.crearUsuario({
      nombre,
      email,
      password: passwordHash,
      rol,
    });

    let datosVendedor = null;
    if (rol === 'vendedor') {
      datosVendedor = await vendedorModel.crearVendedor({
        usuario_id: nuevoUsuario.id,
        nombre_comercio,
        direccion,
      });
    }

    const user = {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      ...(datosVendedor && {
        nombre_comercio: datosVendedor.nombre_comercio,
        direccion: datosVendedor.direccion,
      }),
    };

    const token = generarToken(nuevoUsuario);

    return res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
    }

    const usuario = await usuarioModel.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    let datosVendedor = null;
    if (usuario.rol === 'vendedor') {
      datosVendedor = await vendedorModel.buscarPorUsuarioId(usuario.id);
    }

    const user = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      ...(datosVendedor && {
        nombre_comercio: datosVendedor.nombre_comercio,
        direccion: datosVendedor.direccion,
      }),
    };

    const token = generarToken(usuario);

    return res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registro,
  login,
};