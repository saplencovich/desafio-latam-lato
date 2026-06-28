// Datos mock que ESPEJAN las tablas del Hito 1 (categorias, vendedores, publicaciones).
// services/api.js los lee y los transforma para que la respuesta calce EXACTO
// con el contrato de la API (imagen_url, categoria como String, vendedor anidado).
// En el Hito 3 estos datos se reemplazan por la API real sin tocar las páginas.

// --- tabla categorias --- (coinciden con el menú de navegación del diseño)
export const categorias = [
  { id: 1, nombre: 'Cafés' },
  { id: 2, nombre: 'Cafeteras' },
  { id: 3, nombre: 'Molinos' },
  { id: 4, nombre: 'Accesorios' },
  { id: 5, nombre: 'Métodos' },
]

// --- tabla vendedores ---
export const vendedores = [
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

// --- tabla publicaciones --- (FK: categoria_id, vendedor_id)
// origen y tueste SOLO aplican a café -> en el resto van en null (alimentan los filtros).
export const publicaciones = [
  // Cafés (categoria_id 1)
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
  // Cafeteras (categoria_id 2)
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
  // Molinos (categoria_id 3)
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
  // Accesorios (categoria_id 4)
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
  // Métodos (categoria_id 5)
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