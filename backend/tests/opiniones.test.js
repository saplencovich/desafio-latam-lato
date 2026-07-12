const request = require('supertest');
const app = require('../src/app');

describe('Rutas de Opiniones', () => {

  let token;
  let usuarioId;
  const emailUnico = `opinion${Date.now()}@correo.com`;

  beforeAll(async () => {
    const registro = await request(app)
      .post('/api/auth/registro')
      .send({
        nombre: 'Usuario Opinion',
        email: emailUnico,
        password: '123456',
        rol: 'cliente'
      });

    token = registro.body.token;
    usuarioId = registro.body.user.id;
  });

  test('GET /api/opiniones responde con 200', async () => {
    const response = await request(app)
      .get('/api/opiniones');

    expect(response.statusCode).toBe(200);
  });

  test('POST /api/opiniones responde con 401 sin token', async () => {
    const response = await request(app)
      .post('/api/opiniones')
      .send({
        autor_id: usuarioId,
        vendedor_id: usuarioId,
        puntaje: 5,
        comentario: 'Excelente café'
      });

    expect(response.statusCode).toBe(401);
  });

  test('POST /api/opiniones responde con 201 con token válido', async () => {
    const response = await request(app)
      .post('/api/opiniones')
      .set('Authorization', `Bearer ${token}`)
      .send({
        autor_id: usuarioId,
        vendedor_id: usuarioId,
        puntaje: 5,
        comentario: 'Excelente café'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

});