import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { getPublicacionesPorVendedor } from "../services/api";
import Swal from "sweetalert2";
import "./Perfil.css";

function Perfil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: misPublicaciones, loading } = useFetch(
    () => (user?.id ? getPublicacionesPorVendedor(user.id) : Promise.resolve([])),
    [user?.id]
  );
  
  console.log("Usuario logueado:", user);
  console.log("Mis publicaciones:", misPublicaciones);

  const editarPublicacion = (id) => {
    navigate(`/editar-publicacion/${id}`);
  };
  const eliminarPublicacion = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta publicación?"
    );
    if (confirmacion) {
      Swal.fire({
        icon: "success",
        title: "Publicación eliminada",
        timer: 1200,
        showConfirmButton: false,
      });
      console.log("Eliminar:", id);
    }
  };

    console.log("Usuario:", user);
    console.log("Mis publicaciones:", misPublicaciones);


  return (
    <div className="perfil-contenedor">
      <div className="perfil-card">
        <div className="perfil-avatar">
          {user?.rol === "vendedor" ? (
            <i className="fa-solid fa-store"></i>
          ) : (
            <i className="fa-solid fa-user"></i>
          )}
        </div>
        <h2>{user?.nombre}</h2>
        <p>
          <strong>Correo: </strong> {user?.email}
        </p>
        <p>
          <strong>Nombre del comercio: </strong> {user?.nombre_comercio}
        </p>
        <p>
          <strong>Dirección: </strong> {user?.direccion}
        </p>
        <button className="btn-editar">
          <Link to="/editar-perfil" className="btn-editar-link">
            Editar perfil
          </Link>
        </button>
      </div>
      <div className="perfil-acciones">
        <h5>Mis publicaciones</h5>
        {user?.rol === "vendedor" && (
          <Link to="/crear-publicacion" className="btn-publicar">
            + Crear publicación
          </Link>
        )}
      </div>
      <div className="perfil-publicaciones">
        {loading ? (
          <p>Cargando publicaciones...</p>
        ) : misPublicaciones?.length > 0 ? (
          misPublicaciones.map((publicacion) => (
            <div key={publicacion.id} className="perfil-publicacion">
              <img
                className="perfil-imagen"
                src={publicacion.imagen_url}
                alt={publicacion.titulo}
              />
              <h4>{publicacion.titulo}</h4>
              <p>
                <strong>Categoría:</strong> {publicacion.categoria}
              </p>
              <p>
                <strong>Precio:</strong> ${publicacion.precio}
              </p>
              <p>
                <strong>Stock:</strong> {publicacion.stock}
              </p>
              <p>{publicacion.descripcion}</p>
              <div className="btns-card">
                <button
                  className="btn-editar-publicacion"
                  onClick={() => editarPublicacion(publicacion.id)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar-publicacion"
                  onClick={() => eliminarPublicacion(publicacion.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes publicaciones registradas.</p>
        )}
      </div>
    </div>
  );
}

export default Perfil;