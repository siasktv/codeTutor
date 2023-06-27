const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
require('dotenv').config();

const Faqs = require('../../models/Faqs.models');

describe('Pruebas sobre la API Faqs', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET/api/faqs', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get('/api/faqs').send();
    });

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('La petición nos devuelve un array de Faqs', async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST/api/faqs', () => {
    const newFaqs = {
      tutor: new mongoose.Types.ObjectId(),
      techName: new mongoose.Types.ObjectId(),
      years: 1,
      description: 'This is a test Faqs',
    };
    const wrongFaqs = { nombre: 'Test Faqs' };

    afterAll(async () => {
      await Faqs.deleteMany({ description: 'This is a test Faqs' });
    });

    it('La ruta funciona y se crea correctamente', async () => {
      const response = await request(app)
        .post('/api/faqs')
        .send(newFaqs);

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body._id).toBeDefined();
      expect(response.body.description).toBe(newFaqs.description);
    });

    it('Error en la inserción', async () => {
      const response = await request(app)
        .post('/api/faqs')
        .send(wrongFaqs);

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET/api/faqs/:id', () => {
    let faqs;
    beforeEach(async () => {
      faqs = await Faqs.create({
        tutor: new mongoose.Types.ObjectId(),
        techName: new mongoose.Types.ObjectId(),
        years: 7,
        description: 'This is a test Faqs',
      });
    });

    afterEach(async () => {
      await Faqs.findByIdAndDelete(faqs._id);
    });

    it('La ruta funciona y se obtiene corriente', async () => {
      const response = await request(app)
        .get(`/api/faqs/${faqs._id}`)
        .send();

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body._id).toBeDefined();
      expect(response.body.description).toBe(faqs.description);
    });
  });

  describe('PUT/api/faqs', () => {
    let faqs;
    beforeEach(async () => {
      faqs = await Faqs.create({
        tutor: new mongoose.Types.ObjectId(),
        techName: new mongoose.Types.ObjectId(),
        years: 6,
        description: 'This is a test Faqs',
      });
    });

    afterEach(async () => {
      await Faqs.findByIdAndDelete(faqs._id);
    });

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/faqs/${faqs._id}`)
        .send({
          tutor: new mongoose.Types.ObjectId(),
          techName: new mongoose.Types.ObjectId(),
          years: 2,
          description: 'This is a test update Faqs',
        });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/faqs/${faqs._id}`)
        .send({
          tutor: new mongoose.Types.ObjectId(),
          techName: new mongoose.Types.ObjectId(),
          years: 3,
          description: 'This is a test update 2 Faqs',
        });

      expect(response.body._id).toBeDefined();
      expect(response.body.description).toBe(
        'This is a test update 2 Faqs'
      );
    });
  });

  describe('DELETE/api/faqs', () => {
    let faqs;
    let response;
    beforeEach(async () => {
      faqs = await Faqs.create({
        tutor: new mongoose.Types.ObjectId(),
        techName: new mongoose.Types.ObjectId(),
        years: 5,
        description: 'This is a test delete Faqs',
      });
      response = await request(app)
        .delete(`/api/faqs/${faqs._id}`)
        .send();
    });

    it('La ruta funciona', () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined();

      const foundFaqs = await Faqs.findById(skillsTech._id);
      expect(foundFaqs).toBeNull();
    });
  });
});
