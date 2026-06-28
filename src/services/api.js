import axios from 'axios'
import { publicaciones, categorias, vendedores } from '../data/publicaciones'


export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
})


const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))


const nombreCategoria = (categoria_id) =>
  categorias.find((c) => c.id === categoria_id)?.nombre ?? null


export async function getPublicaciones(filtros = {}) {
  await delay()

  const { categoria, origen, tueste, precio_min, precio_max, q } = filtros
  return publicaciones
    .filter((p) => {
      if (categoria && p.categoria_id !== Number(categoria)) return false
      if (origen && p.origen !== origen) return false
      if (tueste && p.tueste !== tueste) return false
      if (precio_min != null && p.precio < Number(precio_min)) return false
      if (precio_max != null && p.precio > Number(precio_max)) return false
      if (q && !p.titulo.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
    .map((p) => ({
      id: p.id,
      titulo: p.titulo,
      precio: p.precio,
      imagen_url: p.imagen_url,
      categoria: nombreCategoria(p.categoria_id),
    }))
}

// GET /publicaciones/:id  -> detalle (forma COMPLETA + vendedor anidado)
export async function getPublicacion(id) {
  await delay()

  const p = publicaciones.find((x) => x.id === Number(id))
  if (!p) throw new Error('Publicación no encontrada')
  const v = vendedores.find((x) => x.id === p.vendedor_id)
  return {
    id: p.id,
    titulo: p.titulo,
    descripcion: p.descripcion,
    precio: p.precio,
    stock: p.stock,
    imagen_url: p.imagen_url,
    categoria: nombreCategoria(p.categoria_id),
    origen: p.origen,
    tueste: p.tueste,
    vendedor: v
      ? {
          nombre_comercio: v.nombre_comercio,
          direccion: v.direccion,
          telefono: v.telefono,
          email: v.email,
          horario: v.horario,
          despachos: v.despachos,
          reputacion: v.reputacion,
        }
      : null,
  }
}

// GET /categorias
export async function getCategorias() {
  await delay()
  return categorias
}

// Opciones para los <select> de filtros (origen y tueste), derivadas de los datos.
export async function getOpcionesFiltro() {
  await delay()
  const origenes = [...new Set(publicaciones.map((p) => p.origen).filter(Boolean))]
  const tuestes = [...new Set(publicaciones.map((p) => p.tueste).filter(Boolean))]
  return { origenes, tuestes }
}