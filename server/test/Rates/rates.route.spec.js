require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server')

const Rates = require('../../models/Rates.models')

describe('Pruebas sobre la API Rates', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET /api/rates', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/rates').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un array de rates', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST /api/rates', () => {
    const newRate = {
      mentorshipRate: 123456789,
      freelanceRate: 123456789,
    }

    afterAll(async () => {
      await Rates.deleteMany({
        mentorshipRate: 123456789,
        freelanceRate: 123456789,
      })
    })

    it('La ruta funcione', async () => {
      const response = await request(app).post('/api/rates').send(newRate)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se inserta correctamente', async () => {
      const response = await request(app).post('/api/rates').send(newRate)

      expect(response.body._id).toBeDefined()
      expect(response.body.mentorshipRate).toBe(newRate.mentorshipRate)
    })
  })

  describe('PUT /api/rates', () => {
    let rate
    beforeEach(async () => {
      rate = await Rates.create({
        mentorshipRate: 123456789,
        freelanceRate: 123456789,
      })
    })

    afterEach(async () => {
      await Rates.findByIdAndDelete(rate._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app).put(`/api/rates/${rate._id}`).send({
        mentorshipRate: 987654321,
        freelanceRate: 987654321,
      })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app).put(`/api/rates/${rate._id}`).send({
        mentorshipRate: 9876543210,
        freelanceRate: 9876543210,
      })

      expect(response.body._id).toBeDefined()
      expect(response.body.mentorshipRate).toBe(9876543210)
    })
  })

  describe('DELETE /api/rates', () => {
    let rate
    let response
    beforeEach(async () => {
      rate = await Rates.create({
        mentorshipRate: 123456789,
        freelanceRate: 123456789,
      })
      response = await request(app).delete(`/api/rates/${rate._id}`).send()
    })

    it('La ruta funciona', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined()

      const foundRate = await Rates.findById(rate._id)
      expect(foundRate).toBeNull()
    })
  })
})
