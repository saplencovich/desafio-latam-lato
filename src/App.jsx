import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// --- Páginas ---
import Home from './pages/Home'
import Galeria from './pages/Galeria'
import Detalle from './pages/Detalle'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'
import CrearPublicacion from './pages/CrearPublicacion'
import NotFound from './pages/NotFound'

// App = el "mapa" de la aplicación. Aquí se declaran TODAS las rutas (Requerimiento 2).
// La Navbar y el Footer quedan fuera de <Routes> para que se vean en todas las vistas.
function App() {
  return (
    <>
      <Navbar />

      <main style={{ minHeight: '80vh' }}>
        <Routes>
          {/* ---------- Rutas públicas (sin sesión) ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/publicacion/:id" element={<Detalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* ---------- Rutas privadas (requieren sesión) ---------- */}
          {/* ProtectedRoute revisa el Context: si no hay usuario, redirige a /login */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crear-publicacion"
            element={
              <ProtectedRoute>
                <CrearPublicacion />
              </ProtectedRoute>
            }
          />

          {/* ---------- 404: cualquier ruta no definida ---------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
