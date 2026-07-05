const request = require('supertest');
const app = require('../src/app');

describe('Rutas de Publicaciones', () => {

  test('GET /api/publicaciones responde con 200', async () => {
    const response = await request(app)
      .get('/api/publicaciones');

    expect(response.statusCode).toBe(200);
  });

  test('POST /api/publicaciones responde con 201', async () => {
    const response = await request(app)
      .post('/api/publicaciones')
      .send({
        usuario_id: 1,
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