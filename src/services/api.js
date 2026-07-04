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