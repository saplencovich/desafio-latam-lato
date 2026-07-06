import { createContext, useState, useEffect } from 'react'
import { api } from '../services/api';
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
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  setUser(data.user);
  setToken(data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);

  return data.user;
};

const register = async (datos) => {
  const { data } = await api.post("/auth/registro", datos);

  setUser(data.user);
  setToken(data.token);

  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);

  return data.user;
};

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
