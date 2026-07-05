const request = require('supertest');
const app = require('../src/app');

describe('Rutas de Categorías', () => {

  test('GET /api/categorias responde con 200', async () => {
    const response = await request(app)
      .get('/api/categorias');

    expect(response.statusCode).toBe(200);
  });

  test('POST /api/categorias responde con 201', async () => {
    const response = await request(app)
      .post('/api/categorias')
      .send({
        nombre: `Categoría ${Date.now()}`
      });

    expect(response.statusCode).toBe(201);
  });

});