import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'

// --- Estilos globales (Bootstrap + Font Awesome + nuestros estilos) ---
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

// BrowserRouter (React Router) envuelve TODA la app -> habilita la navegación por rutas.
// AuthProvider (Context) envuelve la app -> entrega el estado global de sesión a todos los componentes.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
