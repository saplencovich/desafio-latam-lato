import { createContext, useState, useEffect } from 'react'

// ============================================================
//  CONTEXT API — Estado global de sesión (Requerimiento 5)
// ============================================================
// 1) createContext crea el "canal" global.
// 2) AuthProvider envuelve la app y guarda el estado (user, token).
// 3) Cualquier componente puede leer/usar este estado con el hook useAuth.

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Estado global: el usuario logueado. null = no hay sesión.
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Al abrir la app, recuperamos la sesión guardada (si el usuario ya había entrado).
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setToken(savedToken)
    }
  }, [])

  // -----------------------------------------------------------------
  //  TODO Persona A: en el Hito 3 reemplazar las simulaciones por
  //  llamadas reales con Axios (services/api.js) según el contrato.
  //  Por ahora simulamos la respuesta del backend { token, user }.
  // -----------------------------------------------------------------

  const login = async (email, password) => {
    // El backend respondería: { token, user: { id, nombre, email, rol } }
    const fakeUser = { id: 1, nombre: 'Demo', email, rol: 'vendedor' }
    const fakeToken = 'demo-token'
    setUser(fakeUser)
    setToken(fakeToken)
    localStorage.setItem('user', JSON.stringify(fakeUser))
    localStorage.setItem('token', fakeToken)
    return fakeUser
  }

  const register = async (datos) => {
    // datos = { nombre, email, password, rol, (nombre_comercio, direccion, telefono) }
    const fakeUser = { id: 1, nombre: datos.nombre, email: datos.email, rol: datos.rol }
    const fakeToken = 'demo-token'
    setUser(fakeUser)
    setToken(fakeToken)
    localStorage.setItem('user', JSON.stringify(fakeUser))
    localStorage.setItem('token', fakeToken)
    return fakeUser
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // Todo lo que va en value queda disponible globalmente para los componentes.
  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
