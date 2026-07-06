import { useState } from "react";
import Swal from "sweetalert2";
import "./CrearPublicacion.css";
import { useAuth } from "../hooks/useAuth";

function CrearPublicacion() {
  const { user } = useAuth();
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    categoria: "",
    precio: "",
    stock: "",
    tueste: "",
    origen: "",
    descripcion: "",
    imagen: "",
  });

  const handleChange = (e) => {
    setPublicacion({
      ...publicacion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !publicacion.titulo ||
      !publicacion.categoria ||
      !publicacion.precio ||
      !publicacion.descripcion
    ) {
      Swal.fire({
        icon: "warning",
        title: "Completa todos los campos",
      });
      return;
    }

    try {
      console.log("Enviando al backend...");

      const response = await fetch("http://localhost:3000/api/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: user.id,
          categoria_id: Number(publicacion.categoria),
          titulo: publicacion.titulo,
          descripcion: publicacion.descripcion,
          precio: Number(publicacion.precio),
          stock: Number(publicacion.stock),
          imagen_url: publicacion.imagen,
          origen: publicacion.origen,
          tueste: publicacion.tueste,
        }),
      });

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Respuesta:", data);

      if (!response.ok) {
        throw new Error(data.mensaje || "Error al crear la publicación");
      }

      Swal.fire({
        icon: "success",
        title: "Publicación creada",
        text: "La publicación fue registrada correctamente.",
      });

      setPublicacion({
        titulo: "",
        categoria: "",
        precio: "",
        stock: "",
        tueste: "",
        origen: "",
        descripcion: "",
        imagen: "",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error al crear la publicación",
        text: error.message,
      });
    }
  };

  return (
    <div className="publicacion-container">
      <h1 className="publicacion-titulo">
        Nueva publicación
      </h1>

      <form className="publicacion-card" onSubmit={handleSubmit}>

        <select
          name="categoria"
          value={publicacion.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccione una categoría</option>
          <option value="1">Cafés</option>
          <option value="2">Cafeteras</option>
          <option value="3">Molinos</option>
          <option value="4">Accesorios</option>
          <option value="5">Métodos</option>
        </select>

        <div className="orden-publicacion">

          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={publicacion.titulo}
            onChange={handleChange}
          />

          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={publicacion.precio}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={publicacion.stock}
            onChange={handleChange}
          />

          <input
            type="text"
            name="tueste"
            placeholder="Tueste"
            value={publicacion.tueste}
            onChange={handleChange}
          />

          <input
            type="text"
            name="origen"
            placeholder="Origen"
            value={publicacion.origen}
            onChange={handleChange}
          />

          <input
            type="text"
            name="imagen"
            placeholder="URL de la imagen"
            value={publicacion.imagen}
            onChange={handleChange}
          />

        </div>

        <textarea
          name="descripcion"
          placeholder="Descripción"
          rows="4"
          value={publicacion.descripcion}
          onChange={handleChange}
        />

        <div className="btn-crear">
          <button type="submit" className="btn-crear-publicacion">
            Crear publicación
          </button>
        </div>

      </form>
    </div>
  );
}

export default CrearPublicacion;