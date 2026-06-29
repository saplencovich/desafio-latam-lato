import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import "./Perfil.css";
import { publicaciones, categorias } from "../data/publicaciones";

function Perfil() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const misPublicaciones = publicaciones.filter(
    (pub) => pub.vendedor_id === user?.id
  );
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
        {misPublicaciones.length > 0 ? (
          misPublicaciones.map((publicacion) => {
            const categoria = categorias.find(
              (cat) => cat.id === publicacion.categoria_id
            );

            return (
              <div key={publicacion.id} className="perfil-publicacion">
                <img className="perfil-imagen"
                  src={publicacion.imagen_url}
                  alt={publicacion.titulo}
                />
                <h4>{publicacion.titulo}</h4>
                <p>
                  <strong>Categoría:</strong> {categoria?.nombre}
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
                    onClick={() => editarPublicacion(publicacion.id)}>
                    Editar
                  </button>
                  <button
                    className="btn-eliminar-publicacion"
                    onClick={() => eliminarPublicacion(publicacion.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No tienes publicaciones registradas.</p>
        )}
      </div>
    </div>
  );
}

export default Perfil;