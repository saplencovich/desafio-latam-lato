import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Protege las rutas privadas.
// Lee el estado global (Context): si no hay usuario, redirige a /login.
// Esto es REDIRECCIÓN PROGRAMÁTICA con React Router (Requerimiento 2).
function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
