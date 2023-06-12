const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server')

const Projects = require('../../models/Project.models')

describe('Pruebas sobre la API Projects', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET /api/projects', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/projects').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un array de projects', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST /api/projects', () => {
    const newProject = {
      name: 'Test project',
      link: 'https://www.testproject.com',
      description: 'This is a test project'
    }

    afterAll(async () => {
      await Projects.deleteMany({
        name: 'Test project',
        link: 'https://www.testproject.com',
        description: 'This is a test project'
      })
    })

    it('La ruta funcione', async () => {
      const response = await request(app).post('/api/projects').send(newProject)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se inserta correctamente', async () => {
      const response = await request(app).post('/api/projects').send(newProject)

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe(newProject.name)
    })
  })

  describe('GET /api/projects/:id', () => {
    let project
    beforeEach(async () => {
      project = await Projects.create({
        name: 'Test project',
        link: 'https://www.testproject.com',
        description: 'This is a test project'
      })
    })

    afterEach(async () => {
      await Projects.findByIdAndDelete(project._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .get(`/api/projects/${project._id}`)
        .send()

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se obtiene correctamente', async () => {
      const response = await request(app)
        .get(`/api/projects/${project._id}`)
        .send()

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe(project.name)
    })
  })

  describe('PUT /api/projects', () => {
    let project
    beforeEach(async () => {
      project = await Projects.create({
        name: 'Test project',
        link: 'https://www.testproject.com',
        description: 'This is a test project'
      })
    })

    afterEach(async () => {
      await Projects.findByIdAndDelete(project._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/projects/${project._id}`)
        .send({
          name: 'Test project updated',
          link: 'https://www.testprojectupdated.com',
          description: 'This is a test project updated'
        })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/projects/${project._id}`)
        .send({
          name: 'Test project updated 2',
          link: 'https://www.testprojectupdated2.com',
          description: 'This is a test project updated 2'
        })

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe('Test project updated 2')
    })
  })

  describe('DELETE /api/projects', () => {
    let project
    let response
    beforeEach(async () => {
      project = await Projects.create({
        name: 'Test project',
        link: 'https://www.testproject.com',
        description: 'This is a test project'
      })
      response = await request(app)
        .delete(`/api/projects/${project._id}`)
        .send()
    })

    it('La ruta funciona', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined()

      const foundProject = await Projects.findById(project._id)
      expect(foundProject).toBeNull()
    })
  })
})
