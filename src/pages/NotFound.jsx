import { Link } from 'react-router-dom'
import fondo404 from '../assets/404.png'

// ERROR 404 (pública)
function NotFound() {
  return (
    <div
      style={{
        backgroundImage: `url(${fondo404})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        marginBottom: '-48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: 'var(--blanco)', fontSize: '3rem', marginBottom: '0.5rem' }}>
        Error 404
      </h1>
      <p style={{ color: 'var(--blanco)', fontSize: '1.2rem' }}>
        Te perdiste. Nos pasa a todos antes del primer café.{' '}
        <Link to="/" style={{ color: 'var(--blanco)', textDecoration: 'underline' }}>
          Vuelve a la tienda
        </Link>
      </p>
    </div>
  )
}

export default NotFound