require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
require('dotenv').config();

// const Location = require('../../models/Location.models');

describe('Pruebas sobre la API Location', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET/api/locations', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get('/api/locations').send();
    });

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('La petición nos devuelve un array de Location', async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  
  
});
