const request = require('supertest');
const app = require('../src/app');

describe('Rutas de Opiniones', () => {

  test('GET /api/opiniones responde con 200', async () => {
    const response = await request(app)
      .get('/api/opiniones');

    expect(response.statusCode).toBe(200);
  });

  test('POST /api/opiniones responde con 201', async () => {
    const response = await request(app)
      .post('/api/opiniones')
      .send({
        autor_id: 1,
        vendedor_id: 1,
        puntaje: 5,
        comentario: 'Excelente café'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

});