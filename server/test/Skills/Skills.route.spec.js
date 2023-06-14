const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server')
require('dotenv').config()

const SkillsTech = require('../../models/SkillsTech.models')

describe('Pruebas sobre la API SkillsTech', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET/api/skillstech', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/skillstech').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un array de skillsTech', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST/api/skillstech', () => {
    const newSkillsTech = {
      tutor: new mongoose.Types.ObjectId(),
      techName: new mongoose.Types.ObjectId(),
      years: 1,
      description: 'This is a test SkillsTech'
    }
    const wrongSkillsTech = { nombre: 'Test skillsTech' }

    afterAll(async () => {
      await SkillsTech.deleteMany({ description: 'This is a test SkillsTech' })
    })

    it('La ruta funciona y se crea correctamente', async () => {
      const response = await request(app)
        .post('/api/skillstech')
        .send(newSkillsTech)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
      expect(response.body._id).toBeDefined()
      expect(response.body.description).toBe(newSkillsTech.description)
    })

    it('Error en la inserción', async () => {
      const response = await request(app)
        .post('/api/skillstech')
        .send(wrongSkillsTech)

      expect(response.status).toBe(400)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('GET/api/skillstech/:id', () => {
    let skillsTech
    beforeEach(async () => {
      skillsTech = await SkillsTech.create({
        tutor: new mongoose.Types.ObjectId(),
        techName: new mongoose.Types.ObjectId(),
        years: 7,
        description: 'This is a test SkillsTech'
      })
    })

    afterEach(async () => {
      await SkillsTech.findByIdAndDelete(skillsTech._id)
    })

    it('La ruta funciona y se obtiene corriente', async () => {
      const response = await request(app)
        .get(`/api/skillstech/${skillsTech._id}`)
        .send()

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
      expect(response.body._id).toBeDefined()
      expect(response.body.description).toBe(skillsTech.description)
    })
  })

  describe('PUT/api/skillstech', () => {
    let skillsTech
    beforeEach(async () => {
      skillsTech = await SkillsTech.create({
        tutor: new mongoose.Types.ObjectId(),
        techName: new mongoose.Types.ObjectId(),
        years: 6,
        description: 'This is a test SkillsTech'
      })
    })

    afterEach(async () => {
      await SkillsTech.findByIdAndDelete(skillsTech._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/skillstech/${skillsTech._id}`)
        .send({
          tutor: new mongoose.Types.ObjectId(),
          techName: new mongoose.Types.ObjectId(),
          years: 2,
          description: 'This is a test update SkillsTech'
        })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/skillstech/${skillsTech._id}`)
        .send({
          tutor: new mongoose.Types.ObjectId(),
          techName: new mongoose.Types.ObjectId(),
          years: 3,
          description: 'This is a test update 2 SkillsTech'
        })

      expect(response.body._id).toBeDefined()
      expect(response.body.description).toBe(
        'This is a test update 2 SkillsTech'
      )
    })
  })

  describe('DELETE/api/skillstech', () => {
    let skillsTech
    let response
    beforeEach(async () => {
      skillsTech = await SkillsTech.create({
        tutor: new mongoose.Types.ObjectId(),
        techName: new mongoose.Types.ObjectId(),
        years: 5,
        description: 'This is a test delete SkillsTech'
      })
      response = await request(app)
        .delete(`/api/skillstech/${skillsTech._id}`)
        .send()
    })

    it('La ruta funciona', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined()

      const foundSkillsTech = await SkillsTech.findById(skillsTech._id)
      expect(foundSkillsTech).toBeNull()
    })
  })
})
