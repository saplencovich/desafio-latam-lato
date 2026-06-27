// DETALLE DE PUBLICACIÓN (pública) — Persona B
// TODO: useParams() para leer el :id de la URL + useEffect para cargar el detalle.
//       Mostrar imagen, descripción, datos del vendedor y "Solicita al vendedor".
import { useParams } from 'react-router-dom'

function Detalle() {
  const { id } = useParams() // <- React Router entrega el id de la URL
  return (
    <div className="container py-4">
      <h1>Detalle de la publicación #{id}</h1>
      <p className="text-muted">Stub — la completa Persona B (Catálogo)</p>
    </div>
  )
}
export default Detalle
