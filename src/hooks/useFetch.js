import { useState, useEffect, useCallback } from 'react'

// Custom hook reutilizable para traer datos.
// Recibe una función async (de services/api.js) y un arreglo de dependencias.
// Entrega { data, loading, error, refetch } y se vuelve a ejecutar solo cuando
// cambian las dependencias (ej: el id en Detalle, los filtros en Galería) o
// cuando se llama a refetch() manualmente.
export function useFetch(asyncFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let activo = true // evita setear estado si el componente ya se desmontó

    setLoading(true)
    setError(null)

    asyncFn()
      .then((resultado) => {
        if (activo) setData(resultado)
      })
      .catch((err) => {
        if (activo) setError(err)
      })
      .finally(() => {
        if (activo) setLoading(false)
      })

    // cleanup: si el componente se desmonta antes de que llegue la respuesta,
    // marcamos activo=false y no intentamos actualizar su estado.
    return () => {
      activo = false
    }
    // Dependemos del arreglo que recibimos, no de asyncFn (que es una función
    // nueva en cada render y provocaría un bucle infinito).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  return { data, loading, error, refetch }
}