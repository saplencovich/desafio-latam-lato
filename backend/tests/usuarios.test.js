const request = require('supertest');
const app = require('../src/app');

describe('Rutas de Usuarios', () => {

  let token;
  const emailUnico = `perfil${Date.now()}@correo.com`;

  beforeAll(async () => {
    const registro = await request(app)
      .post('/api/auth/registro')
      .send({
        nombre: 'Usuario Perfil',
        email: emailUnico,
        password: '123456',
        rol: 'cliente'
      });

    token = registro.body.token;
  });

  test('GET /api/usuarios/perfil responde con 401 sin token', async () => {
    const response = await request(app)
      .get('/api/usuarios/perfil');

    expect(response.statusCode).toBe(401);
  });

  test('GET /api/usuarios/perfil responde con 403 con token inválido', async () => {
    const response = await request(app)
      .get('/api/usuarios/perfil')
      .set('Authorization', 'Bearer token-invalido-123');

    expect(response.statusCode).toBe(403);
  });

  test('GET /api/usuarios/perfil responde con 200 con token válido', async () => {
    const response = await request(app)
      .get('/api/usuarios/perfil')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(emailUnico);
  });

  test('PUT /api/usuarios/perfil responde con 200 y actualiza el nombre', async () => {
    const response = await request(app)
      .put('/api/usuarios/perfil')
      .set('Authorization', `Bearer ${token}`)
      .send({ nombre: 'Usuario Actualizado' });

    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe('Usuario Actualizado');
  });

});