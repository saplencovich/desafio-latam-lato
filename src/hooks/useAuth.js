import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Custom hook para consumir el Context de sesión (Requerimiento 4 + 5).
// Evita repetir useContext(AuthContext) en cada componente: basta con useAuth().
export function useAuth() {
  return useContext(AuthContext)
}
