const request = require('supertest')
const mongoose = require('mongoose')
const server = require('../../server')
const User = require('../../models/User.models')

describe('Pruebas sobre la API User', () => {
  beforeAll(async () => {
    await mongoose.connect(
      'mongodb+srv://bianca:rrA0hZbUoR0WO0Ch@codetutor.zrw5km4.mongodb.net/'
    )
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET /api/user', () => {
    let response
    beforeEach(async () => {
      response = await request(server).get('/api/user').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un objeto', async () => {
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('POST /api/user', () => {
    const newUser = {
      fullName: 'bianca',
      email: 'bianca@gmail.com',
    }
    const wrongUser = { email: 'bianca@gmail.com' }

    afterAll(async () => {
      await User.deleteMany({ fullName: 'bianca' })
    })

    it('La ruta funciona', async () => {
      const response = await request(server).post('/api/user').send(newUser)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se inserta correctamente', async () => {
      const response = await request(server).post('/api/user').send(newUser)

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe(newUser.name)
    })

    it('Error en la inserción', async () => {
      const response = await request(server).post('/api/user').send(wrongUser)

      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('PUT /api/user', () => {
    let user
    beforeEach(async () => {
      user = await User.create({
        fullName: 'bianca',
        email: 'bianca@gmail.com',
      })
    })

    afterEach(async () => {
      await User.findByIdAndDelete(user._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(server).put(`/api/user/${user._id}`).send({
        fullName: 'magali',
      })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(server).put(`/api/user/${user._id}`).send({
        fullName: 'magali',
      })

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe('magali')
    })
  })

  describe('DELETE /api/user', () => {
    let user
    let response
    beforeEach(async () => {
      user = await User.create({
        fullName: 'bianca',
        email: 'bianca@gmail.com',
      })
      response = await request(server).delete(`/api/user/${user._id}`).send()
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
