CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL CHECK (rol IN ('cliente', 'vendedor')),
  foto_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vendedores (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nombre_comercio VARCHAR(150) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  horario VARCHAR(150),
  despachos VARCHAR(150),
  telefono VARCHAR(30),
  email VARCHAR(150)
);

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE publicaciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id),
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  imagen_url VARCHAR(255),
  origen VARCHAR(100),
  tueste VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE opiniones (
  id SERIAL PRIMARY KEY,
  autor_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  vendedor_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  puntaje INTEGER NOT NULL CHECK (puntaje BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);