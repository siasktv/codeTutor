require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server')

const Experience = require('../../models/Experience.models')

describe('Pruebas sobre la API Projects', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET /api/experiences', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/experiences').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un array de experience', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST /api/experiences', () => {
    const newExperience = {
      position: 'Test experience',
      company: 'Test experience',
      start_date: '2023-06-12',
      end_date: '2023-06-12',
    }

    afterAll(async () => {
      await Experience.deleteMany({
        position: 'Test experience',
        company: 'Test experience',
        start_date: '2023-06-12',
        end_date: '2023-06-12',
      })
    })

    it('La ruta funcione', async () => {
      const response = await request(app)
        .post('/api/experiences')
        .send(newExperience)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se inserta correctamente', async () => {
      const response = await request(app)
        .post('/api/experiences')
        .send(newExperience)

      expect(response.body._id).toBeDefined()
      expect(response.body.position).toBe(newExperience.position)
    })
  })

  describe('GET /api/experiences/:id', () => {
    let experience
    beforeEach(async () => {
      experience = await Experience.create({
        position: 'Test experience',
        company: 'Test experience',
        start_date: '2023-06-12',
        end_date: '2023-06-12',
      })
    })

    afterEach(async () => {
      await Experience.findByIdAndDelete(experience._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .get(`/api/experiences/${experience._id}`)
        .send()

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se obtiene correctamente', async () => {
      const response = await request(app)
        .get(`/api/experiences/${experience._id}`)
        .send()

      expect(response.body._id).toBeDefined()
      expect(response.body.position).toBe(experience.position)
    })
  })

  describe('PUT /api/experiences/:id', () => {
    let experience
    beforeEach(async () => {
      experience = await Experience.create({
        position: 'Test experience',
        company: 'Test experience',
        start_date: '2023-06-12',
        end_date: '2023-06-12',
      })
    })

    afterEach(async () => {
      await Experience.findByIdAndDelete(experience._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/experiences/${experience._id}`)
        .send({
          position: 'Test experience',
          company: 'Test experience',
          start_date: '2023-06-12',
          end_date: '2023-06-12',
        })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/experiences/${experience._id}`)
        .send({
          position: 'Test experience2',
          company: 'Test experience2',
          start_date: '2023-06-12',
          end_date: '2023-06-12',
        })

      expect(response.body._id).toBeDefined()
      expect(response.body.position).toBe('Test experience2')
    })
  })

  describe('DELETE /api/experiences/:id', () => {
    let experience
    let response
    beforeEach(async () => {
      experience = await Experience.create({
        position: 'Test experience2',
        company: 'Test experience2',
        start_date: '2023-06-12',
        end_date: '2023-06-12',
      })
      response = await request(app)
        .delete(`/api/experiences/${experience._id}`)
        .send()
    })

    it('La ruta funciona', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined()

      const foundExperience = await Experience.findById(experience._id)
      expect(foundExperience).toBeNull()
    })
  })
})
