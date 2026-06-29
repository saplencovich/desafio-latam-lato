import { useState } from "react";
import Swal from "sweetalert2";
import "./CrearPublicacion.css";

function CrearPublicacion() {

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

  const handleSubmit = (e) => {
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

    console.log(publicacion);

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
  };

  return (
    <div className="publicacion-container">
      <h1 className="publicacion-titulo">
        Nueva publicación
      </h1>
      {/* 🔥 FORM CON onSubmit */}
      <form className="publicacion-card" onSubmit={handleSubmit}>
        <select
          name="categoria"
          value={publicacion.categoria}
          onChange={handleChange}
        >
          <option value="">Categoría</option>
          <option value="Cafés">Cafés</option>
          <option value="Cafeteras">Cafeteras</option>
          <option value="Molinos">Molinos</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Métodos">Métodos</option>
        </select>
        <div className="orden-publicacion">
          <input
            placeholder="Titulo"
            type="text"
            name="titulo"
            value={publicacion.titulo}
            onChange={handleChange}
          />
          <input
            placeholder="Precio"
            type="number"
            name="precio"
            value={publicacion.precio}
            onChange={handleChange}
          />
          <input
            placeholder="Stock"
            type="number"
            name="stock"
            value={publicacion.stock}
            onChange={handleChange}
          />
          <input
            placeholder="Tueste"
            type="text"
            name="tueste"
            value={publicacion.tueste}
            onChange={handleChange}
          />
          <input
            placeholder="Origen"
            type="text"
            name="origen"
            value={publicacion.origen}
            onChange={handleChange}
          />
          <input
            placeholder="Imagen (URL)"
            type="text"
            name="imagen"
            value={publicacion.imagen}
            onChange={handleChange}
          />
        </div>
        <textarea
          placeholder="Descripción"
          name="descripcion"
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