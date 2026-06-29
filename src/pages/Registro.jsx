import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import "./Registro.css";

function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
    rol: "cliente",
    nombre_comercio:"",
    direccion:"",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formulario.nombre ||
      !formulario.email ||
      !formulario.password ||
      !formulario.confirmarPassword
    ) {
      Swal.fire({
        icon: "warning",
        title: "Completa todos los campos",
        text: "Para continuar con tu próximo Café.☕",
      });

      if (
        formulario.rol ==="vendedor" &&
        (!formulario.nombre_comercio || !formulario.direccion)
      ){
        Swal.fire({
          icon:"warning",
          tittle:"Completa la informacion del comercio",
          text:"Los vendedores deben ingresar todos los campos requeridos"
        })
      }
      return;
    }

    if (formulario.password !== formulario.confirmarPassword) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      await register(formulario);
      Swal.fire({
        icon: "success",
        title: "Cuenta creada correctamente",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/perfil");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No fue posible registrar el usuario",
      });
    }
  };

  return (
    <div className="registro-container">
      <h1 className="registro-title">
        Crear Cuenta
      </h1>
      <form className="registro-card" onSubmit={handleSubmit} >
        <label>Nombre completo</label>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
        />
        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={formulario.email}
          onChange={handleChange}
        />
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formulario.password}
          onChange={handleChange}
        />
        <label>Confirmar contraseña</label>
        <input
          type="password"
          name="confirmarPassword"
          value={formulario.confirmarPassword}
          onChange={handleChange}
        />
        <label>Tipo de usuario</label>
        <select
          name="rol"
          value={formulario.rol}
          onChange={handleChange}
        >
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
        </select>
        {formulario.rol === "vendedor" && (
          <>
          <label>Nombre del comercio</label>
          <input 
          type="text"
          name="nombre_comercio"
          value={formulario.nombre_comercio}
          onChange={handleChange}
          placeholder="Ej: MocCafés"
           />
           <label>Dirección del comercio</label>
           <input 
           type="text"
           name="direccion"
           value={formulario.direccion}
           onChange={handleChange}
           placeholder="Ej: Av. La Florida 3456" 
           />
          </>
        )}
        <button type="submit">
          Crear Cuenta
        </button>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registro;