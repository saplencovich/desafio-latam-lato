// components/PublicacionCard.jsx
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function PublicacionCard({ publicacion, esDueno = false, onEditar, onEliminar }) {
  const { id, titulo, precio, imagen_url } = publicacion

  // formatea el precio como peso chileno: 14990 -> $14.990
  const precioCLP = precio?.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imagen_url}
        alt={titulo}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6">{titulo}</Card.Title>
        <Card.Text className="fw-bold mb-3">{precioCLP}</Card.Text>

        {/* Renderizado condicional: dueño vs. visitante */}
        {esDueno ? (
          <div className="mt-auto d-flex gap-2">
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => onEditar?.(id)}
            >
              Editar
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => onEliminar?.(id)}
            >
              Eliminar
            </Button>
          </div>
        ) : (
          <Button
            as={Link}
            to={`/publicacion/${id}`}
            size="sm"
            className="mt-auto"
            style={{ backgroundColor: '#4B2E2B', border: 'none' }}
          >
            Ver producto
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default PublicacionCard