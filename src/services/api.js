import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================
// CATEGORÍAS
// ==========================

export async function getCategorias() {
  const { data } = await api.get("/categorias");
  return data;
}

// ==========================
// PUBLICACIONES
// ==========================

export async function getPublicaciones(filtros = {}) {
  const { data } = await api.get("/publicaciones");

  let publicaciones = data;

  if (filtros.categoria) {
    publicaciones = publicaciones.filter(
      (p) => p.categoria_id === Number(filtros.categoria)
    );
  }

  if (filtros.origen) {
    publicaciones = publicaciones.filter(
      (p) => p.origen === filtros.origen
    );
  }

  if (filtros.tueste) {
    publicaciones = publicaciones.filter(
      (p) => p.tueste === filtros.tueste
    );
  }

  if (filtros.precio_min) {
    publicaciones = publicaciones.filter(
      (p) => p.precio >= Number(filtros.precio_min)
    );
  }

  if (filtros.precio_max) {
    publicaciones = publicaciones.filter(
      (p) => p.precio <= Number(filtros.precio_max)
    );
  }

  if (filtros.q) {
    publicaciones = publicaciones.filter((p) =>
      p.titulo.toLowerCase().includes(filtros.q.toLowerCase())
    );
  }

  return publicaciones;
}

export async function getPublicacion(id) {
  const { data } = await api.get(`/publicaciones/${id}`);
  return data;
}

export async function getPublicacionesPorVendedor(vendedorId) {
  const { data } = await api.get("/publicaciones");

  return data.filter(
    (p) => Number(p.usuario_id) === Number(vendedorId)
  );
}

export async function createPublicacion(publicacion) {
  const { data } = await api.post("/publicaciones", publicacion);
  return data;
}

export async function updatePublicacion(id, publicacion) {
  const { data } = await api.put(`/publicaciones/${id}`, publicacion);
  return data;
}

export async function deletePublicacion(id) {
  const { data } = await api.delete(`/publicaciones/${id}`);
  return data;
}

// ==========================
// OPINIONES
// ==========================

export async function createOpinion(opinion) {
  const { data } = await api.post("/opiniones", opinion);
  return data;
}

export async function getOpinionesPorVendedor(vendedorId, puntaje) {
  const params = puntaje ? { puntaje } : {};
  const { data } = await api.get(`/opiniones/vendedor/${vendedorId}`, { params });
  return data;
}

// ==========================
// USUARIOS
// ==========================

export async function updateNombre(nombre) {
  const { data } = await api.put("/usuarios/perfil", { nombre });
  return data;
}

export async function updateEmail(email) {
  const { data } = await api.put("/usuarios/perfil/email", { email });
  return data;
}

export async function updatePassword(passwordActual, passwordNueva) {
  const { data } = await api.put("/usuarios/perfil/password", { passwordActual, passwordNueva });
  return data;
}

// ==========================
// VENDEDORES
// ==========================

export async function updateComercio(datos) {
  const { data } = await api.put("/vendedores/comercio", datos);
  return data;
}

// ==========================
// OPCIONES FILTRO
// ==========================

export async function getOpcionesFiltro() {
  const publicaciones = await getPublicaciones();

  const origenes = [
    ...new Set(
      publicaciones
        .map((p) => p.origen)
        .filter(Boolean)
    ),
  ];

  const tuestes = [
    ...new Set(
      publicaciones
        .map((p) => p.tueste)
        .filter(Boolean)
    ),
  ];

  return {
    origenes,
    tuestes,
  };
}