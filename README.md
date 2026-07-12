# LATO Cafés

Marketplace de café de especialidad con modelo de contacto directo al vendedor (sin carrito de compras).

## Integrantes
- Samuel Plencovich
- Michael Ugalde ©

## Stack Tecnológico

**Frontend:**
- Vite + React
- React Bootstrap
- Axios
- React Router DOM
- SweetAlert2
- Font Awesome

**Backend:**
- Express
- JWT (jsonwebtoken)
- bcrypt
- PostgreSQL (pg)

## Estructura del proyecto

Monorepo con el backend anidado en `lato-cafes-client/backend/`.

## Variables de entorno

El backend requiere un archivo `.env` en `lato-cafes-client/backend/` con las siguientes variables (ver `.env.example`):

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DB_HOST` | Host de la base de datos PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de conexión a PostgreSQL | `5432` |
| `DB_USER` | Usuario de la base de datos | `postgres` |
| `DB_PASSWORD` | Contraseña del usuario de la base de datos | `********` |
| `DB_NAME` | Nombre de la base de datos | `lato_cafes` |
| `JWT_SECRET` | Clave secreta para firmar los tokens JWT | `********` |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token | `1d` |

## Instalación y ejecución local

### Backend
```bash
cd lato-cafes-client/backend
npm install
# crear .env a partir de .env.example y completar los valores
npm start        # producción
npm run dev      # desarrollo (con nodemon, recarga automática)
```

### Base de datos
```bash
# crear la base de datos
createdb lato_cafes

# ejecutar el schema
psql -d lato_cafes -f schema.sql
```

### Frontend
```bash
cd lato-cafes-client
npm install
npm run dev
```

## Tests

El backend cuenta con una batería de pruebas automatizadas con Jest y Supertest cubriendo autenticación, publicaciones, categorías, usuarios y opiniones.

```bash
cd lato-cafes-client/backend
npm test
```