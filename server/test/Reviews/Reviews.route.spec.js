const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
require('dotenv').config();

const Reviews = require('../../models/Review.models');

describe('Pruebas sobre la API Reviews', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET/api/reviews', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get('/api/reviews').send();
    });

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('La petición nos devuelve un array de Reviews', async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST/api/reviews', () => {
    const newReviews = {
      tutor: new mongoose.Types.ObjectId(),
      user: new mongoose.Types.ObjectId(),
      comment: 'This is a test reviews',
      rating: 4,
    };
    const wrongReviews = { nombre: 'Test reviews' };

    afterAll(async () => {
      await Reviews.deleteMany({ description: 'This is a test reviews' });
    });

    it('La ruta funciona y se crea correctamente', async () => {
      const response = await request(app)
        .post('/api/reviews')
        .send(newReviews);

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body._id).toBeDefined();
      expect(response.body.description).toBe(newReviews.description);
    });

    it('Error en la inserción', async () => {
      const response = await request(app)
        .post('/api/reviews')
        .send(wrongReviews);

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET/api/reviews/:id', () => {
    let reviews;
    beforeEach(async () => {
      reviews = await Reviews.create({
        tutor: new mongoose.Types.ObjectId(),
        user: new mongoose.Types.ObjectId(),
        comment: 'This is a test reviews',
        rating: 3,
      });
    });

    afterEach(async () => {
      await Reviews.findByIdAndDelete(reviews._id);
    });

    it('La ruta funciona y se obtiene corriente', async () => {
      const response = await request(app)
        .get(`/api/reviews/${reviews._id}`)
        .send();

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body._id).toBeDefined();
      expect(response.body.description).toBe(reviews.description);
    });
  });

  describe('PUT/api/reviews', () => {
    let reviews;
    beforeEach(async () => {
      reviews = await Reviews.create({
        tutor: new mongoose.Types.ObjectId(),
        user: new mongoose.Types.ObjectId(),
        comment: 'This is a test reviews',
        rating: 5,
      });
    });

    afterEach(async () => {
      await Reviews.findByIdAndDelete(reviews._id);
    });

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/reviews/${reviews._id}`)
        .send({
          tutor: new mongoose.Types.ObjectId(),
          user: new mongoose.Types.ObjectId(),
          comment: 'This is a test update reviews',
          rating: 2,
        });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/reviews/${reviews._id}`)
        .send({
          tutor: new mongoose.Types.ObjectId(),
          user: new mongoose.Types.ObjectId(),
          comment: 'This is a test update2 reviews',
          rating: 1,
        });

      expect(response.body._id).toBeDefined();
      expect(response.body.comment).toBe('This is a test update2 reviews');
    });
  });

  describe('DELETE/api/reviews', () => {
    let reviews;
    let response;
    beforeEach(async () => {
      reviews = await Reviews.create({
        tutor: new mongoose.Types.ObjectId(),
        user: new mongoose.Types.ObjectId(),
        comment: 'This is a test delete Reviews',
        rating: 2,
      });
      response = await request(app)
        .delete(`/api/reviews/${reviews._id}`)
        .send();
    });

    it('La ruta funciona', () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined();

      const foundReviews = await Reviews.findById(reviews._id);
      expect(foundReviews).toBeNull();
    });
  });
});
