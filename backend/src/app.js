const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const vendedoresRoutes = require('./routes/vendedores.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const publicacionesRoutes = require('./routes/publicaciones.routes');
const opinionesRoutes = require('./routes/opiniones.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/vendedores', vendedoresRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/opiniones', opinionesRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

module.exports = app;