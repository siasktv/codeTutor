const request = require('supertest')
const mongoose = require('mongoose')
const server = require('../../server')
const User = require('../../models/User.models')

describe('Pruebas sobre la API User', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET /api/users', () => {
    let response
    beforeEach(async () => {
      response = await request(server).get('/api/users').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un objeto', async () => {
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('POST /api/users', () => {
    const newUser = {
      fullName: 'bianca',
      email: 'bianca@gmail.com',
      password: '12345',
    }
    const wrongUser = {
      email: 'bianca@gmail.com',
    }

    afterAll(async () => {
      await User.deleteMany({ fullName: 'bianca' })
    })

    it('La ruta funciona', async () => {
      const response = await request(server).post('/api/users').send(newUser)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe(newUser.name)
    })

    it('Error en la inserción', async () => {
      const response = await request(server).post('/api/users').send(wrongUser)

      expect(response.status).toBe(400)
      expect(response.body.error).toBeDefined()
    })

    it('No cree duplicados', async () => {
      const response = await request(server).post('/api/users').send(newUser)

      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('PUT /api/users', () => {
    let user
    beforeEach(async () => {
      user = await User.create({
        fullName: 'masa',
        email: 'masa@gmail.com',
        password: '123456',
      })
    })

    afterEach(async () => {
      await User.findByIdAndDelete(user._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(server)
        .put(`/api/users/${user._id}`)
        .send({
          fullName: 'magali',
        })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(server)
        .put(`/api/users/${user._id}`)
        .send({
          fullName: 'magali',
        })

      expect(response.body._id).toBeDefined()
      expect(response.body.fullName).toBe('magali')
    })
  })

  describe('DELETE /api/users', () => {
    let user
    let response
    beforeEach(async () => {
      user = await User.create({
        fullName: 'tati',
        email: 'tati@gmail.com',
        password: '123456',
      })
      response = await request(server).delete(`/api/users/${user._id}`).send()
    })

    it('La ruta funciona', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined()

      const foundUser = await User.findById(user._id)
      expect(foundUser).toBeNull()
    })
  })
})
