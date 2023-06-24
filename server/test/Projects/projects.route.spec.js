require('dotenv').config()
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
      tutor: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
      name: 'Test project',
      end_date: '2023-06-12',
      link: 'https://www.testproject.com',
      description: 'This is a test project',
      techName: [
        new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
      ],
    };

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
        tutor: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        name: 'Test project',
        end_date: '2023-06-12',
        link: 'https://www.testproject.com',
        description: 'This is a test project',
        techName: [
          new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        ],
      });
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
        tutor: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        name: 'Test project',
        end_date: '2023-06-12',
        link: 'https://www.testproject.com',
        description: 'This is a test project',
        techName: [
          new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        ],
      });
    })

    afterEach(async () => {
      await Projects.findByIdAndDelete(project._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/projects/${project._id}`)
        .send({
          tutor: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          name: 'Test project updated',
          end_date: '2023-06-12',
          link: 'https://www.testprojectupdated.com',
          description: 'This is a test project updated',
          techName: [
            new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
            new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          ],
        });

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/projects/${project._id}`)
        .send({
          tutor: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          name: 'Test project updated 2',
          link: 'https://www.testprojectupdated2.com',
          end_date: '2023-06-14',
          description: 'This is a test project updated 2',
          techName: [
            new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
            new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          ],
        });

      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe('Test project updated 2')
    })
  })

  describe('DELETE /api/projects', () => {
    let project
    let response
    beforeEach(async () => {
      project = await Projects.create({
        tutor: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        name: 'Test project',
        link: 'https://www.testproject.com',
        end_date: '2023-06-15',
        description: 'This is a test project',
        techName: [
          new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        ],
      });
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
