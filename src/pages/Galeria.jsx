import { useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getPublicaciones, getCategorias, getOpcionesFiltro } from '../services/api'
import PublicacionCard from '../components/PublicacionCard'

// GALERÍA (pública)
function Galeria() {
  // lee el ?categoria=ID que manda el Home (useNavigate -> URL)
  const [searchParams] = useSearchParams()
  const categoriaURL = searchParams.get('categoria') || ''

  const [filtros, setFiltros] = useState({
    categoria: categoriaURL,
    origen: '',
    tueste: '',
    precio: '',
    q: '',
  })

  // datos para los <select>
  const { data: categorias } = useFetch(() => getCategorias(), [])
  const { data: opciones } = useFetch(() => getOpcionesFiltro(), [])

  const { data: publicaciones, loading } = useFetch(() => {
    const { categoria, origen, tueste, precio, q } = filtros
    const params = { categoria, origen, tueste, q }
    if (precio) {
      const [min, max] = precio.split('-')
      if (min) params.precio_min = Number(min)
      if (max) params.precio_max = Number(max)
    }
  return getPublicaciones(params)
  }, [filtros])

  console.log("PUBLICACIONES", publicaciones)

  const handleFiltro = (e) => {
    const { name, value } = e.target
    setFiltros((prev) => ({ ...prev, [name]: value }))
  }

  const limpiarFiltros = () =>
    setFiltros({ categoria: '', origen: '', tueste: '', precio: '', q: '' })

  return (
    <Container className="py-4">
      <Row>
        {/* ---- BARRA DE FILTROS ---- */}
        <Col md={3} className="mb-4">
          <div className="p-3 rounded" style={{ backgroundColor: 'var(--crema)' }}>
            <h5 style={{ color: 'var(--cafe-oscuro)' }}>Filtros</h5>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoria" value={filtros.categoria} onChange={handleFiltro}>
                <option value="">Todas</option>
                {categorias?.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Origen</Form.Label>
              <Form.Select name="origen" value={filtros.origen} onChange={handleFiltro}>
                <option value="">Todos</option>
                {opciones?.origenes.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tueste</Form.Label>
              <Form.Select name="tueste" value={filtros.tueste} onChange={handleFiltro}>
                <option value="">Todos</option>
                {opciones?.tuestes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Select name="precio" value={filtros.precio} onChange={handleFiltro}>
                <option value="">Cualquiera</option>
                <option value="0-15000">Menos de $15.000</option>
                <option value="15000-30000">$15.000 a $30.000</option>
                <option value="30000-100000">$30.000 a $100.000</option>
                <option value="100000-">Más de $100.000</option>
              </Form.Select>
            </Form.Group>

            <Button variant="outline-dark" size="sm" onClick={limpiarFiltros}>
              Limpiar filtros
            </Button>
          </div>
        </Col>

        {/* ---- BUSCADOR + GRILLA ---- */}
        <Col md={9}>
          <Form.Control
            type="search"
            name="q"
            placeholder="Buscar productos..."
            value={filtros.q}
            onChange={handleFiltro}
            className="mb-4"
          />

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: 'var(--cafe-oscuro)' }} />
            </div>
          ) : publicaciones?.length === 0 ? (
            <p className="text-center text-muted py-5">
              No hay productos que coincidan con tu búsqueda.
            </p>
          ) : (
            <Row xs={1} sm={2} md={2} lg={3} className="g-4">
              {publicaciones?.map((pub) => (
                <Col key={pub.id}>
                  <PublicacionCard publicacion={pub} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Galeria