const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server')

const Tech = require('../../models/Tech.models')

describe('Pruebas sobre la API Tech', () => {
  beforeAll(async () => {
    await mongoose.connect(
      'mongodb+srv://bianca:rrA0hZbUoR0WO0Ch@codetutor.zrw5km4.mongodb.net/'
    )
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET /api/tech', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/tech').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un array de tech', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST /api/tech', () => {
    const newTech = {
      name: 'test tech',
      category: 'Web App',
    }
    const wrongTech = { nombre: 'test tech' }

    afterAll(async () => {
      await Tech.deleteMany({ name: 'test tech' })
    })

    it('La ruta funcione', async () => {
      const response = await request(app).post('/api/tech').send(newTech)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se inserta correctamente', async () => {
      const response = await request(app).post('/api/tech').send(newTech)

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe(newTech.name)
    })

    it('Error en la inserción', async () => {
      const response = await request(app).post('/api/tech').send(wrongTech)

      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('PUT /api/tech', () => {
    let tech
    beforeEach(async () => {
      tech = await Tech.create({
        name: 'test tech',
        category: 'Web App',
      })
    })

    afterEach(async () => {
      await Tech.findByIdAndDelete(tech._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app).put(`/api/tech/${tech._id}`).send({
        name: 'tech updated',
      })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app).put(`/api/tech/${tech._id}`).send({
        name: 'tech updated',
      })

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe('tech updated')
    })
  })

  describe('DELETE /api/tech', () => {
    let tech
    let response
    beforeEach(async () => {
      tech = await Tech.create({
        name: 'test tech',
        category: 'Web App',
      })
      response = await request(app).delete(`/api/tech/${tech._id}`).send()
    })

    it('La ruta funciona', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined()

      const foundTech = await Tech.findById(tech._id)
      expect(foundTech).toBeNull()
    })
  })
})
