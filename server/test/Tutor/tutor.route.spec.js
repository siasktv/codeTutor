require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server')
require('dotenv').config()

const Tutor = require('../../models/Tutor.models')

describe('Pruebas sobre la API Tutor', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET/api/tutors', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/tutors').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un array de tutors', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST/api/tutors', () => {
    const newTutor = {
      user: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
      bio: [
        {
          specialty: 'Front',
          description: 'Test description',
          linkBriefcase: 'https://www.testbriefcase.com'
        },
        {
          specialty: 'Back',
          description: 'Test description',
          linkBriefcase: 'https://www.testbriefcase.com'
        }
      ],
      languages: [
        {
          language: 'Español',
          level: 'Beginner'
        },
        {
          language: 'Ingles',
          level: 'Intermediate'
        }
      ],
      skills: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
      experience: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
      projects: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
      rates: [
        {
          name: 'Mentorship',
          value: 1000
        },
        {
          name: 'Freelance',
          value: 1500
        }
      ],
      socialMedia: [
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/test'
        },
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/test'
        }
      ]
    }
    const wrongTutor = {
      bio: 'Test description'
    }

    afterAll(async () => {
      await Tutor.deleteMany({ user: newTutor.user })
    })

    it('La ruta funcione', async () => {
      const response = await request(app).post('/api/tutors').send(newTutor)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
      expect(response.body._id).toBeDefined()
      expect(response.body.user._id).toBe(newTutor.user.toString())
    })

    it('Error en la inserción', async () => {
      const response = await request(app).post('/api/tutors').send(wrongTutor)

      expect(response.status).toBe(400)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('GET/api/tutors/:id', () => {
    let tutor
    beforeEach(async () => {
      tutor = await Tutor.create({
        user: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        bio: [
          {
            specialty: 'Front',
            description: 'Test description',
            linkBriefcase: 'https://www.testbriefcase.com'
          },
          {
            specialty: 'Back',
            description: 'Test description',
            linkBriefcase: 'https://www.testbriefcase.com'
          }
        ],
        languages: [
          {
            language: 'Español',
            level: 'Beginner'
          },
          {
            language: 'Ingles',
            level: 'Intermediate'
          }
        ],
        skills: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        experience: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        projects: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        rates: [
          {
            name: 'Mentorship',
            value: 1000
          },
          {
            name: 'Freelance',
            value: 1500
          }
        ],
        socialMedia: [
          {
            name: 'Instagram',
            link: 'https://www.instagram.com/test'
          },
          {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/test'
          }
        ]
      })
    })

    afterEach(async () => {
      await Tutor.findByIdAndDelete(tutor._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app).get(`/api/tutors/${tutor._id}`).send()

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se obtiene correctamente', async () => {
      const response = await request(app).get(`/api/tutors/${tutor._id}`).send()

      expect(response.body._id).toBeDefined()
      expect(response.body.user._id).toBe(tutor.user.toString())
    })
  })

  describe('PUT/api/tutors/:id', () => {
    let tutor
    beforeEach(async () => {
      tutor = await Tutor.create({
        user: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        bio: [
          {
            specialty: 'Front',
            description: 'Test description',
            linkBriefcase: 'https://www.testbriefcase.com'
          },
          {
            specialty: 'Back',
            description: 'Test description',
            linkBriefcase: 'https://www.testbriefcase.com'
          }
        ],
        languages: [
          {
            language: 'Español',
            level: 'Beginner'
          },
          {
            language: 'Ingles',
            level: 'Intermediate'
          }
        ],
        skills: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        experience: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        projects: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        rates: [
          {
            name: 'Mentorship',
            value: 1000
          },
          {
            name: 'Freelance',
            value: 1500
          }
        ],
        socialMedia: [
          {
            name: 'Instagram',
            link: 'https://www.instagram.com/test'
          },
          {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/test'
          }
        ]
      })
    })

    afterEach(async () => {
      await Tutor.findByIdAndDelete(tutor._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/tutors/${tutor._id}`)
        .send({
          user: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          bio: [
            {
              specialty: 'Front',
              description: 'Test description updated',
              linkBriefcase: 'https://www.testbriefcase.com'
            },
            {
              specialty: 'Back',
              description: 'Test description updated',
              linkBriefcase: 'https://www.testbriefcase.com'
            }
          ],
          languages: [
            {
              language: 'Español',
              level: 'Beginner'
            }
          ],
          skills: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
          experience: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
          projects: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
          rates: [
            {
              name: 'Mentorship',
              value: 1500
            }
          ],
          socialMedia: [
            {
              name: 'Instagram',
              link: 'https://www.instagram.com/test'
            },
            {
              name: 'GitHub',
              link: 'https://www.github.com/test'
            }
          ]
        })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/tutors/${tutor._id}`)
        .send({
          user: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
          bio: [
            {
              specialty: 'Back',
              description: 'Test description updated',
              linkBriefcase: 'https://www.testbriefcase.com'
            }
          ],
          languages: [
            {
              language: 'Ingles',
              level: 'Advanced'
            }
          ],
          skills: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
          experience: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
          projects: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
          rates: [
            {
              name: 'Mentorship',
              value: 1200
            }
          ],
          socialMedia: [
            {
              name: 'LinkedIn',
              link: 'https://www.linkedin.com/testupdated'
            }
          ]
        })

      expect(response.body._id).toBeDefined()
      expect(response.body.socialMedia[0].link).toBe(
        'https://www.linkedin.com/testupdated'
      )
    })
  })

  describe('DELETE/api/tutors/:id', () => {
    let tutor
    let response
    beforeEach(async () => {
      tutor = await Tutor.create({
        user: new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d'),
        bio: [
          {
            specialty: 'Front',
            description: 'Test description',
            linkBriefcase: 'https://www.testbriefcase.com'
          },
          {
            specialty: 'Back',
            description: 'Test description',
            linkBriefcase: 'https://www.testbriefcase.com'
          }
        ],
        languages: [
          {
            language: 'Español',
            level: 'Beginner'
          },
          {
            language: 'Ingles',
            level: 'Intermediate'
          }
        ],
        skills: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        experience: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        projects: [new mongoose.Types.ObjectId('5e8b7a4d7b4b8a2c4c4e2c4d')],
        rates: [
          {
            name: 'Mentorship',
            value: 1000
          },
          {
            name: 'Freelance',
            value: 1500
          }
        ],
        socialMedia: [
          {
            name: 'Instagram',
            link: 'https://www.instagram.com/test'
          },
          {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/test'
          }
        ]
      })
      response = await request(app).delete(`/api/tutors/${tutor._id}`).send()
    })

    it('La ruta funciona', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined()

      const foundTutor = await Tutor.findById(tutor._id)
      expect(foundTutor).toBeNull()
    })
  })
})
