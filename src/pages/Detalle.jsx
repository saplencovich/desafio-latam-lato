import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getPublicacion } from '../services/api'

// DETALLE DE PUBLICACIÓN (pública)
function Detalle() {
  const { id } = useParams()

  const { data: pub, loading, error } = useFetch(() => getPublicacion(id), [id])

  // estado de carga
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" style={{ color: 'var(--cafe-oscuro)' }} />
      </Container>
    )
  }

  if (error || !pub) {
    return (
      <Container className="text-center py-5">
        <h3 style={{ color: 'var(--cafe-oscuro)' }}>Publicación no encontrada</h3>
        <p className="text-muted">El producto que buscas no existe o fue eliminado.</p>
        <Button as={Link} to="/galeria" variant="outline-dark">
          Volver a la galería
        </Button>
      </Container>
    )
  }

  const precioCLP = pub.precio.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
  const v = pub.vendedor
  const telLimpio = v?.telefono?.replace(/\D/g, '') // para wa.me y tel:
  const mapsUrl = v
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.direccion)}`
    : '#'

  return (
    <Container className="py-4">
      <Button
        as={Link}
        to="/galeria"
        variant="link"
        className="mb-3 px-0"
        style={{ color: 'var(--cafe-medio)' }}
      >
        ← Volver a la galería
      </Button>

      <Row className="g-4">
        {/* IMAGEN */}
        <Col md={6}>
          <img
            src={pub.imagen_url}
            alt={pub.titulo}
            className="img-fluid rounded shadow-sm"
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </Col>

        {/* INFORMACIÓN */}
        <Col md={6}>
          <h2 style={{ color: 'var(--cafe-oscuro)' }}>{pub.titulo}</h2>
          <h3 className="fw-bold mb-3" style={{ color: 'var(--cafe-medio)' }}>
            {precioCLP}
          </h3>

          <p style={{ color: 'var(--cafe-gris)' }}>{pub.descripcion}</p>

          <ul className="list-unstyled">
            <li><strong>Categoría:</strong> {pub.categoria}</li>
            {/* origen y tueste solo aparecen si es café (si no son null) */}
            {pub.origen && <li><strong>Origen:</strong> {pub.origen}</li>}
            {pub.tueste && <li><strong>Tueste:</strong> {pub.tueste}</li>}
            <li><strong>Stock:</strong> {pub.stock} disponibles</li>
          </ul>

          {/* DATOS DEL VENDEDOR */}
          {v && (
            <div className="p-3 rounded mt-3" style={{ backgroundColor: 'var(--crema)' }}>
              <h5 style={{ color: 'var(--cafe-oscuro)' }}>{v.nombre_comercio}</h5>
              <p className="mb-1">
                Ubicación: {v.direccion}{' '}
                (<a href={mapsUrl} target="_blank" rel="noreferrer">Ver en Google Maps</a>)
              </p>
              <p className="mb-1">Horario: {v.horario}</p>
              <p className="mb-1">Despachos: {v.despachos}</p>
              <p className="mb-0">Reputación: ⭐ {v.reputacion} / 5</p>
            </div>
          )}

          {/* SOLICITA AL VENDEDOR */}
          {v && (
            <div className="mt-4">
              <p className="fw-bold mb-2" style={{ color: 'var(--cafe-oscuro)' }}>
                Solicita al vendedor vía:
              </p>
              <div className="d-flex gap-2">
                <Button
                  href={`https://wa.me/${telLimpio}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: 'var(--cafe-medio)', border: 'none' }}
                >
                  <i className="fa-brands fa-whatsapp me-2"></i>WhatsApp
                </Button>
                <Button href={`tel:${v.telefono}`} variant="outline-dark">
                  <i className="fa-solid fa-phone me-2"></i>Llamar
                </Button>
                <Button
                  href={`mailto:${v.email}?subject=Consulta por ${pub.titulo}`}
                  style={{ backgroundColor: 'var(--cafe-medio)', border: 'none' }}
                >
                  <i className="fa-solid fa-envelope me-2"></i>Email
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Detalle