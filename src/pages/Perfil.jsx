import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import {
  getPublicacionesPorVendedor,
  updateNombre,
  updateEmail,
  updatePassword,
  updateComercio,
  deletePublicacion,
} from "../services/api";
import Swal from "sweetalert2";
import "./Perfil.css";

function Perfil() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const { data: misPublicaciones, loading, refetch } = useFetch(
    () => (user?.id ? getPublicacionesPorVendedor(user.id) : Promise.resolve([])),
    [user?.id]
  );

  const [nombre, setNombre] = useState(user?.nombre || "");
  const [email, setEmail] = useState(user?.email || "");
  const [guardandoDatos, setGuardandoDatos] = useState(false);

  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");
  const [guardandoPassword, setGuardandoPassword] = useState(false);

  const [comercio, setComercio] = useState({
    nombre_comercio: user?.nombre_comercio || "",
    direccion: user?.direccion || "",
    horario: user?.horario || "",
    despachos: user?.despachos || "",
    telefono: user?.telefono || "",
    email: user?.email || "",
  });
  const [guardandoComercio, setGuardandoComercio] = useState(false);

  const historial = JSON.parse(localStorage.getItem("historialVistos") || "[]");

  const handleGuardarDatos = async (e) => {
    e.preventDefault();
    setGuardandoDatos(true);
    try {
      if (nombre !== user?.nombre) {
        const actualizado = await updateNombre(nombre);
        updateUser({ nombre: actualizado.nombre });
      }
      if (email !== user?.email) {
        const actualizado = await updateEmail(email);
        updateUser({ email: actualizado.email });
      }
      Swal.fire({
        icon: "success",
        title: "Datos actualizados",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudieron actualizar los datos",
        text: error.response?.data?.mensaje || error.message,
      });
    } finally {
      setGuardandoDatos(false);
    }
  };

  const handleCambiarPassword = async (e) => {
    e.preventDefault();

    if (!passwordActual || !passwordNueva || !passwordConfirmar) {
      Swal.fire({ icon: "warning", title: "Completa todos los campos" });
      return;
    }

    if (passwordNueva !== passwordConfirmar) {
      Swal.fire({ icon: "error", title: "Las contraseñas nuevas no coinciden" });
      return;
    }

    setGuardandoPassword(true);
    try {
      await updatePassword(passwordActual, passwordNueva);
      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        timer: 1200,
        showConfirmButton: false,
      });
      setPasswordActual("");
      setPasswordNueva("");
      setPasswordConfirmar("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo cambiar la contraseña",
        text: error.response?.data?.mensaje || error.message,
      });
    } finally {
      setGuardandoPassword(false);
    }
  };

  const handleComercioChange = (e) => {
    setComercio({ ...comercio, [e.target.name]: e.target.value });
  };

  const handleGuardarComercio = async (e) => {
    e.preventDefault();
    setGuardandoComercio(true);
    try {
      const actualizado = await updateComercio(comercio);
      updateUser(actualizado);
      Swal.fire({
        icon: "success",
        title: "Datos del comercio actualizados",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudieron actualizar los datos del comercio",
        text: error.response?.data?.mensaje || error.message,
      });
    } finally {
      setGuardandoComercio(false);
    }
  };

  const editarPublicacion = (id) => {
    navigate(`/editar-publicacion/${id}`);
  };

  const eliminarPublicacion = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta publicación?"
    );
    if (!confirmacion) return;

    try {
      await deletePublicacion(id);
      Swal.fire({
        icon: "success",
        title: "Publicación eliminada",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar la publicación",
        text: error.response?.data?.mensaje || error.message,
      });
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
        {user?.rol === "vendedor" && (
          <p>
            <strong>Nombre del comercio: </strong> {user?.nombre_comercio}
          </p>
        )}
      </div>

      <div className="perfil-editar-seccion">
        <h5>Editar datos personales</h5>
        <Form onSubmit={handleGuardarDatos}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            type="submit"
            className="mt-3 btn-guardar-perfil"
            disabled={guardandoDatos}
          >
            {guardandoDatos ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Form>
      </div>

      <div className="perfil-editar-seccion">
        <h5>Cambiar contraseña</h5>
        <Form onSubmit={handleCambiarPassword}>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Contraseña actual</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Confirmar nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordConfirmar}
                  onChange={(e) => setPasswordConfirmar(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            type="submit"
            className="mt-3 btn-guardar-perfil"
            disabled={guardandoPassword}
          >
            {guardandoPassword ? "Guardando..." : "Cambiar contraseña"}
          </Button>
        </Form>
      </div>

      {user?.rol === "vendedor" && (
        <div className="perfil-editar-seccion">
          <h5>Datos del comercio</h5>
          <Form onSubmit={handleGuardarComercio}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nombre del comercio</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre_comercio"
                    value={comercio.nombre_comercio}
                    onChange={handleComercioChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={comercio.direccion}
                    onChange={handleComercioChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Horario</Form.Label>
                  <Form.Control
                    type="text"
                    name="horario"
                    value={comercio.horario}
                    onChange={handleComercioChange}
                    placeholder="Ej: Lun a Vie 9:00 - 18:00"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Despachos</Form.Label>
                  <Form.Control
                    type="text"
                    name="despachos"
                    value={comercio.despachos}
                    onChange={handleComercioChange}
                    placeholder="Ej: Retiro en tienda / Despacho a domicilio"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={comercio.telefono}
                    onChange={handleComercioChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Correo de contacto</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={comercio.email}
                    onChange={handleComercioChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              type="submit"
              className="mt-3 btn-guardar-perfil"
              disabled={guardandoComercio}
            >
              {guardandoComercio ? "Guardando..." : "Guardar datos del comercio"}
            </Button>
          </Form>
        </div>
      )}

      {user?.rol === "vendedor" && (
        <>
          <div className="perfil-acciones">
            <h5>Mis publicaciones</h5>
            <Link to="/crear-publicacion" className="btn-publicar">
              + Crear publicación
            </Link>
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
        </>
      )}

      <div className="perfil-editar-seccion">
        <h5>Historial de productos vistos</h5>
        {historial.length === 0 ? (
          <p className="text-muted">Todavía no has visto ningún producto.</p>
        ) : (
          <div className="perfil-publicaciones">
            {historial.map((item) => (
              <Link
                key={item.id}
                to={`/publicacion/${item.id}`}
                className="perfil-publicacion perfil-historial-item"
              >
                <img
                  className="perfil-imagen"
                  src={item.imagen_url}
                  alt={item.titulo}
                />
                <h4>{item.titulo}</h4>
                <p>${item.precio}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;