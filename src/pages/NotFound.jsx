// ERROR 404 (pública) — Persona B
// TODO: imagen de fondo + "Vuelve a la tienda" con <Link to="/">
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1>Error 404</h1>
      <p>Te perdiste. Nos pasa a todos antes del primer café.</p>
      <Link to="/">Vuelve a la tienda</Link>
    </div>
  )
}
export default NotFound
