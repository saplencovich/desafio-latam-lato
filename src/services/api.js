import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
})

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

const categorias = [
  { id: 1, nombre: 'Cafés' },
  { id: 2, nombre: 'Cafeteras' },
  { id: 3, nombre: 'Molinos' },
  { id: 4, nombre: 'Accesorios' },
  { id: 5, nombre: 'Métodos' },
]

const vendedores = [
  {
    id: 1,
    nombre_comercio: 'Diseño & Café Co.',
    direccion: 'Av. Providencia 1234, Santiago',
    telefono: '+56 9 1234 5678',
    email: 'contacto@disenocafe.cl',
    horario: 'Lun a Vie: 8:00 a 20:00 hrs.',
    despachos: 'Envíos todos los miércoles.',
    reputacion: 4.9,
  },
  {
    id: 2,
    nombre_comercio: 'Tostaduría Aroma Sur',
    direccion: 'Manuel Montt 980, Providencia',
    telefono: '+56 9 8765 4321',
    email: 'ventas@aromasur.cl',
    horario: 'Lun a Sáb: 9:00 a 19:00 hrs.',
    despachos: 'Despacho en 24 a 48 hrs.',
    reputacion: 4.7,
  },
]

const publicaciones = [
  {
    id: 1,
    titulo: 'Café Geisha Lavado 250g',
    descripcion:
      'Geisha de finca con notas florales, jazmín y un final cítrico. Lote de cosecha reciente, ideal para métodos filtrados.',
    precio: 14990,
    stock: 12,
    imagen_url: 'https://placehold.co/600x400?text=Geisha+Lavado',
    categoria_id: 1,
    vendedor_id: 2,
    origen: 'Etiopía',
    tueste: 'Claro',
  },
  {
    id: 2,
    titulo: 'Café Bourbon Rojo 500g',
    descripcion:
      'Dulzor a caramelo y panela, cuerpo medio. Funciona muy bien en espresso y en prensa francesa.',
    precio: 12990,
    stock: 20,
    imagen_url: 'https://placehold.co/600x400?text=Bourbon+Rojo',
    categoria_id: 1,
    vendedor_id: 2,
    origen: 'Colombia',
    tueste: 'Medio',
  },
  {
    id: 3,
    titulo: 'Café Catuaí Natural 250g',
    descripcion:
      'Proceso natural con notas a frutos rojos y chocolate. Tueste más oscuro para quienes prefieren cuerpo.',
    precio: 13990,
    stock: 8,
    imagen_url: 'https://placehold.co/600x400?text=Catuai+Natural',
    categoria_id: 1,
    vendedor_id: 1,
    origen: 'Brasil',
    tueste: 'Oscuro',
  },
  {
    id: 4,
    titulo: 'Cafetera espresso S20 Pro',
    descripcion:
      'Máquina espresso semiautomática con molinillo integrado y vaporizador. Presión de 15 bares.',
    precio: 189990,
    stock: 5,
    imagen_url: 'https://placehold.co/600x400?text=Espresso+S20+Pro',
    categoria_id: 2,
    vendedor_id: 1,
    origen: null,
    tueste: null,
  },
  {
    id: 5,
    titulo: 'Cafetera italiana (moka) 6 tazas',
    descripcion:
      'Cafetera moka de aluminio para 6 tazas. Clásica, fácil de usar y de limpiar.',
    precio: 24990,
    stock: 15,
    imagen_url: 'https://placehold.co/600x400?text=Moka+6+tazas',
    categoria_id: 2,
    vendedor_id: 1,
    origen: null,
    tueste: null,
  },
  {
    id: 6,
    titulo: 'Molinillo manual de muelas cónicas',
    descripcion:
      'Muelas cónicas de cerámica con ajuste de molienda. Portátil, perfecto para viajes.',
    precio: 24990,
    stock: 10,
    imagen_url: 'https://placehold.co/600x400?text=Molinillo+Manual',
    categoria_id: 3,
    vendedor_id: 2,
    origen: null,
    tueste: null,
  },
  {
    id: 7,
    titulo: 'Tazas de vidrio térmico 250ml',
    descripcion:
      'Vidrio térmico, ideal para latte, cappuccino o americano. Apta para microondas y lavavajillas.',
    precio: 9990,
    stock: 30,
    imagen_url: 'https://placehold.co/600x400?text=Tazas+de+vidrio',
    categoria_id: 4,
    vendedor_id: 1,
    origen: null,
    tueste: null,
  },
  {
    id: 8,
    titulo: 'Prensa francesa 600ml',
    descripcion:
      'Vidrio borosilicato resistente al calor y filtro de acero inoxidable. Fácil de limpiar.',
    precio: 19990,
    stock: 18,
    imagen_url: 'https://placehold.co/600x400?text=Prensa+Francesa',
    categoria_id: 5,
    vendedor_id: 1,
    origen: null,
    tueste: null,
  },
]

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

export async function getCategorias() {
  await delay()
  return categorias
}

export async function getOpcionesFiltro() {
  await delay()
  const origenes = [...new Set(publicaciones.map((p) => p.origen).filter(Boolean))]
  const tuestes = [...new Set(publicaciones.map((p) => p.tueste).filter(Boolean))]
  return { origenes, tuestes }
}

export async function getPublicacionesPorVendedor(vendedorId) {
  await delay()

  return publicaciones
    .filter((p) => p.vendedor_id === vendedorId)
    .map((p) => ({
      id: p.id,
      titulo: p.titulo,
      descripcion: p.descripcion,
      precio: p.precio,
      stock: p.stock,
      imagen_url: p.imagen_url,
      categoria: nombreCategoria(p.categoria_id),
    }))
}