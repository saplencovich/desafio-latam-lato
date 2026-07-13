import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
   });

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.email || !formulario.password) {
      Swal.fire({
        icon: "warning",
        title: "Completa todos los campos",
        text: "Para continuar con tu próximo Café.☕",
      });
      return;
    }

    try {
      await login(formulario.email, formulario.password);
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/perfil");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No fue posible iniciar sesión",
      });
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      <form className="login-card" onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={formulario.email}
          onChange={handleChange}
        />
        <label>Contraseña</label>
        <div style={{ position: "relative" }}>
          <input
            type={mostrarPassword ? "text" : "password"}
            name="password"
            value={formulario.password}
            onChange={handleChange}
            style={{ width: "100%", paddingRight: "35px" }}
          />
          <i
            className={mostrarPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
            onClick={() => setMostrarPassword(!mostrarPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#555",
            }}
          ></i>
        </div>
        <button type="submit">
          Ingresar
        </button>
        <p>
          ¿No tienes cuenta?{" "}
          <Link to="/registro">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;