import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getPublicaciones, getCategorias } from '../services/api'
import PublicacionCard from '../components/PublicacionCard'
import hero from '../assets/hero.png'

function Home() {
  const navigate = useNavigate()

  const { data: publicaciones, loading } = useFetch(() => getPublicaciones(), [])
  const { data: categorias } = useFetch(() => getCategorias(), [])

  return (
    <>
      <div style={{ position: 'relative' }}>
        <img
          src={hero}
          alt="LATO Cafés"
          style={{ width: '100%', height: '380px', objectFit: 'cover' }}
        />
      </div>

      <Container className="py-5">
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
          {categorias?.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => navigate(`/galeria?categoria=${cat.id}`)}
              style={{
                backgroundColor: 'var(--crema)',
                color: 'var(--cafe-oscuro)',
                border: 'none',
                fontWeight: 600,
                letterSpacing: '1px',
                padding: '0.6rem 2rem',
              }}
            >
              {cat.nombre.toUpperCase()}
            </Button>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0" style={{ color: 'var(--cafe-oscuro)' }}>Destacados</h2>
          <Button
            as={Link}
            to="/galeria"
            variant="outline-dark"
            size="sm"
          >
            Ver toda la galería
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: 'var(--cafe-oscuro)' }} />
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {publicaciones?.slice(0, 4).map((pub) => (
              <Col key={pub.id}>
                <PublicacionCard publicacion={pub} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default Home