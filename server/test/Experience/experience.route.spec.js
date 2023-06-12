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

  describe('GET /api/experience', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/experience').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un array de projects', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST /api/experience', () => {
    const newExperience = {
      position: 'Test experience',
      company: 'Test experience',
      start_date: 2022,
      end_date: 2023,
    }

    afterAll(async () => {
      await Experience.deleteMany({
        position: 'Test experience',
        company: 'Test experience',
        start_date: 2022,
        end_date: 2023,
      })
    })

    it('La ruta funcione', async () => {
      const response = await request(app)
        .post('/api/experience')
        .send(newExperience)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se inserta correctamente', async () => {
      const response = await request(app)
        .post('/api/experience')
        .send(newExperience)

      expect(response.body._id).toBeDefined()
      expect(response.body.position).toBe(newExperience.position)
    })
  })

  describe('GET /api/experience/:id', () => {
    let experience
    beforeEach(async () => {
      experience = await Experience.create({
        position: 'Test experience',
        company: 'Test experience',
        start_date: 2022,
        end_date: 2023,
      })
    })

    afterEach(async () => {
      await Experience.findByIdAndDelete(experience._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .get(`/api/experience/${experience._id}`)
        .send()

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se obtiene correctamente', async () => {
      const response = await request(app)
        .get(`/api/experience/${experience._id}`)
        .send()

      expect(response.body._id).toBeDefined()
      expect(response.body.position).toBe(experience.position)
    })
  })

  describe('PUT /api/experience', () => {
    let experience
    beforeEach(async () => {
      experience = await Experience.create({
        position: 'Test experience',
        company: 'Test experience',
        start_date: 2022,
        end_date: 2023,
      })
    })

    afterEach(async () => {
      await Experience.findByIdAndDelete(newExperience._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/experience/${experience._id}`)
        .send({
          position: 'Test experience',
          company: 'Test experience',
          start_date: 2022,
          end_date: 2023,
        })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/experience/${experience._id}`)
        .send({
          position: 'Test experience2',
          company: 'Test experience2',
          start_date: 2022,
          end_date: 2023,
        })

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe('Test experience2')
    })
  })

  describe('DELETE /api/experience', () => {
    let experience
    let response
    beforeEach(async () => {
      experience = await Experience.create({
        position: 'Test experience2',
        company: 'Test experience2',
        start_date: 2022,
        end_date: 2023,
      })
      response = await request(app)
        .delete(`/api/projects/${experience._id}`)
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
