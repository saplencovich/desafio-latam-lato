import { useState } from 'react'
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../hooks/useAuth'
import { getPublicacion, createOpinion, getOpinionesPorVendedor } from '../services/api'

// DETALLE DE PUBLICACIÓN (pública)
function Detalle() {
  const { id } = useParams()
  const { user } = useAuth()

  const [refreshKey, setRefreshKey] = useState(0)
  const [puntaje, setPuntaje] = useState(0)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [filtroEstrellas, setFiltroEstrellas] = useState('')

  const { data: pub, loading, error } = useFetch(() => getPublicacion(id), [id, refreshKey])

  const vendedorId = pub?.usuario_id

  const { data: opiniones, loading: loadingOpiniones } = useFetch(
    () => (vendedorId ? getOpinionesPorVendedor(vendedorId, filtroEstrellas || undefined) : Promise.resolve([])),
    [vendedorId, filtroEstrellas, refreshKey]
  )

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

  const handleEnviarOpinion = async (e) => {
    e.preventDefault()

    if (!puntaje) {
      Swal.fire({
        icon: 'warning',
        title: 'Selecciona una calificación',
      })
      return
    }

    setEnviando(true)
    try {
      await createOpinion({
        autor_id: user.id,
        vendedor_id: pub.usuario_id,
        puntaje,
        comentario,
      })

      Swal.fire({
        icon: 'success',
        title: 'Opinión enviada',
        timer: 1500,
        showConfirmButton: false,
      })

      setPuntaje(0)
      setComentario('')
      setRefreshKey((k) => k + 1)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo enviar la opinión',
        text: err.response?.data?.mensaje || err.message,
      })
    } finally {
      setEnviando(false)
    }
  }

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
              <p className="mb-0">Reputación: ⭐ {v.reputacion} / 5 ({v.total_opiniones} opiniones)</p>
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

      {/* DEJAR OPINIÓN — ancho completo */}
      <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'var(--crema)' }}>
        <p className="fw-bold mb-2" style={{ color: 'var(--cafe-oscuro)' }}>
          Deja tu opinión sobre este vendedor
        </p>

        {!user ? (
          <p className="text-muted mb-0">
            <Link to="/login">Inicia sesión</Link> para dejar una opinión.
          </p>
        ) : (
          <Form onSubmit={handleEnviarOpinion}>
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <i
                  key={n}
                  className={n <= puntaje ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                  style={{ color: 'var(--cafe-medio)', fontSize: '1.5rem', cursor: 'pointer', marginRight: '4px' }}
                  onClick={() => setPuntaje(n)}
                ></i>
              ))}
            </div>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Comparte tu experiencia con este vendedor (opcional)"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              maxLength={500}
              className="mb-2"
            />
            <Button
              type="submit"
              disabled={enviando}
              style={{ backgroundColor: 'var(--cafe-medio)', border: 'none' }}
            >
              {enviando ? 'Enviando...' : 'Enviar opinión'}
            </Button>
          </Form>
        )}
      </div>

      {/* LISTA DE OPINIONES*/}
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="fw-bold mb-0" style={{ color: 'var(--cafe-oscuro)' }}>
            Opiniones ({opiniones?.length ?? 0})
          </p>
          <Form.Select
            size="sm"
            style={{ width: 'auto' }}
            value={filtroEstrellas}
            onChange={(e) => setFiltroEstrellas(e.target.value)}
          >
            <option value="">Todas las estrellas</option>
            <option value="5">5 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="2">2 estrellas</option>
            <option value="1">1 estrella</option>
          </Form.Select>
        </div>

        {loadingOpiniones ? (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" style={{ color: 'var(--cafe-oscuro)' }} />
          </div>
        ) : opiniones?.length === 0 ? (
          <p className="text-muted">Este vendedor todavía no tiene opiniones con este filtro.</p>
        ) : (
          opiniones?.map((op) => (
            <div key={op.id} className="border rounded p-3 mb-3">
              <div className="d-flex justify-content-between">
                <strong style={{ color: 'var(--cafe-oscuro)' }}>{op.autor_nombre}</strong>
                <span style={{ color: 'var(--cafe-medio)' }}>
                  {'★'.repeat(op.puntaje)}{'☆'.repeat(5 - op.puntaje)}
                </span>
              </div>
              {op.comentario && <p className="mb-1 text-muted">{op.comentario}</p>}
              <small className="text-muted">
                {new Date(op.created_at).toLocaleDateString('es-CL')}
              </small>
            </div>
          ))
        )}
      </div>
    </Container>
  )
}

export default Detalle