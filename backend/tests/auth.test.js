const request = require('supertest');
const app = require('../src/app');

describe('Rutas de Auth', () => {

  const emailUnico = `test${Date.now()}@correo.com`;

  test('POST /api/auth/registro responde con 201 y devuelve token + user', async () => {
    const response = await request(app)
      .post('/api/auth/registro')
      .send({
        nombre: 'Usuario Test',
        email: emailUnico,
        password: '123456',
        rol: 'cliente'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe(emailUnico);
  });

  test('POST /api/auth/registro responde con 400 si faltan campos obligatorios', async () => {
    const response = await request(app)
      .post('/api/auth/registro')
      .send({
        email: 'incompleto@correo.com'
      });

    expect(response.statusCode).toBe(400);
  });

  test('POST /api/auth/registro responde con 409 si el correo ya existe', async () => {
    const response = await request(app)
      .post('/api/auth/registro')
      .send({
        nombre: 'Usuario Duplicado',
        email: emailUnico,
        password: '123456',
        rol: 'cliente'
      });

    expect(response.statusCode).toBe(409);
  });

  test('POST /api/auth/login responde con 200 y devuelve token + user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: emailUnico,
        password: '123456'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe(emailUnico);
  });

  test('POST /api/auth/login responde con 401 si la contraseña es incorrecta', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: emailUnico,
        password: 'contraseñaIncorrecta'
      });

    expect(response.statusCode).toBe(401);
  });

  test('POST /api/auth/login responde con 401 si el correo no existe', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'noexiste@correo.com',
        password: '123456'
      });

    expect(response.statusCode).toBe(401);
  });

});