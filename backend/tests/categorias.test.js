const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

describe('Rutas de Categorías', () => {

  let categoriaCreadaId;

  test('GET /api/categorias responde con 200', async () => {
    const response = await request(app)
      .get('/api/categorias');

    expect(response.statusCode).toBe(200);
  });

  test('POST /api/categorias responde con 201', async () => {
    const response = await request(app)
      .post('/api/categorias')
      .send({
        nombre: `Categoría Test ${Date.now()}`
      });

    expect(response.statusCode).toBe(201);
    categoriaCreadaId = response.body.id;
  });

  afterAll(async () => {
    if (categoriaCreadaId) {
      await pool.query('DELETE FROM categorias WHERE id = $1', [categoriaCreadaId]);
    }
  });

});