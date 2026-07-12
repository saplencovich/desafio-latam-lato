const request = require('supertest');
const app = require('../src/app');

describe('Rutas de Publicaciones', () => {

  let token;
  let usuarioId;
  const emailUnico = `publicacion${Date.now()}@correo.com`;

  beforeAll(async () => {
    const registro = await request(app)
      .post('/api/auth/registro')
      .send({
        nombre: 'Vendedor Test',
        email: emailUnico,
        password: '123456',
        rol: 'vendedor',
        nombre_comercio: 'Comercio Test',
        direccion: 'Dirección Test 123'
      });

    token = registro.body.token;
    usuarioId = registro.body.user.id;
  });

  test('GET /api/publicaciones responde con 200', async () => {
    const response = await request(app)
      .get('/api/publicaciones');

    expect(response.statusCode).toBe(200);
  });

  test('POST /api/publicaciones responde con 401 sin token', async () => {
    const response = await request(app)
      .post('/api/publicaciones')
      .send({
        usuario_id: usuarioId,
        categoria_id: 1,
        titulo: 'Producto Sin Token',
        descripcion: 'Descripción Test',
        precio: 10000,
        stock: 10,
        imagen_url: '',
        origen: 'Chile',
        tueste: 'Medio'
      });

    expect(response.statusCode).toBe(401);
  });

  test('POST /api/publicaciones responde con 201 con token válido', async () => {
    const response = await request(app)
      .post('/api/publicaciones')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuario_id: usuarioId,
        categoria_id: 1,
        titulo: 'Producto Test',
        descripcion: 'Descripción Test',
        precio: 10000,
        stock: 10,
        imagen_url: '',
        origen: 'Chile',
        tueste: 'Medio'
      });

    expect(response.statusCode).toBe(201);
  });

});