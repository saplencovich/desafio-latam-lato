import { Link, useNavigate } from 'react-router-dom'
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/logo.jpg'

// Navbar = base funcional. CONSUME el Context (Requerimiento 5):
// muestra opciones distintas según haya sesión o no.
// TODO Persona A: agregar el menú de categorías (Cafés, Cafeteras, Molinos...) y el logo.
function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') // redirección programática tras cerrar sesión
  }

  return (
    <BSNavbar expand="lg" className="border-bottom" style={{ backgroundColor: '#EEE1CD' }}>
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          <img src={logo} alt="LATO Cafés" style={{ height: '40px' }} />
        </BSNavbar.Brand>

        <Nav className="ms-auto align-items-center gap-2">
          <Nav.Link as={Link} to="/galeria">Galería</Nav.Link>

          {user ? (
            // Si HAY sesión
            <>
              <Nav.Link as={Link} to="/perfil">Mi perfil</Nav.Link>
              <Nav.Link as="button" className="btn btn-link nav-link" onClick={handleLogout}>
                Cerrar sesión
              </Nav.Link>
            </>
          ) : (
            // Si NO hay sesión
            <>
              <Nav.Link as={Link} to="/registro">Regístrate</Nav.Link>
              <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </BSNavbar>
  )
}

export default Navbar
