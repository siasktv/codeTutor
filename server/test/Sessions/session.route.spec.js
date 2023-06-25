require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server')
require('dotenv').config()

const Session = require('../../models/Session.models')
const { isCancel } = require('axios')

describe('Pruebas sobre la API Session', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.dbURI)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET/api/session', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/session').send()
    })

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('La petición nos devuelve un array de sessions', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST/api/session', () => {
    const newSession = {
      sessionId: '123456789',
      tutorUserId: '6489d0b59fb69b703760f3fb',
      clientUserId: '648a5217a644d4cd59cc5884',
      appointmentDate: 1586342400000,
      minutes: 60,
      price: 1000,
      expiredDate: 1586342400000
    }
    const wrongSession = {
      tutorUserId: '6489d0b59fb69b703760f3fb'
    }

    afterAll(async () => {
      await Session.deleteMany({ tutorUserId: newSession.tutorUserId })
    })

    it('La ruta funcione', async () => {
      const response = await request(app).post('/api/session').send(newSession)

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
      expect(response.body._id).toBeDefined()
      expect(response.body.tutorUserId._id).toBe(newSession.tutorUserId)
    })

    it('Error en la inserción', async () => {
      const response = await request(app)
        .post('/api/session')
        .send(wrongSession)

      expect(response.status).toBe(400)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('GET/api/session/:id', () => {
    let session
    beforeEach(async () => {
      session = await Session.create({
        sessionId: '123456789',
        tutorUserId: '6489d0b59fb69b703760f3fb',
        clientUserId: '648a5217a644d4cd59cc5884',
        appointmentDate: 1586342400000,
        minutes: 60,
        price: 1000,
        expiredDate: 1586342400000
      })
    })

    afterEach(async () => {
      await Session.findByIdAndDelete(session._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .get(`/api/session/${session.sessionId}`)
        .send()

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se obtiene correctamente', async () => {
      const response = await request(app)
        .get(`/api/session/${session.sessionId}`)
        .send()

      expect(response.body._id).toBeDefined()
      expect(response.body.minutes).toBe(session.minutes)
    })
  })

  describe('PUT/api/session/:id', () => {
    let session
    beforeEach(async () => {
      session = await Session.create({
        sessionId: '123456789',
        tutorUserId: '6489d0b59fb69b703760f3fb',
        clientUserId: '648a5217a644d4cd59cc5884',
        appointmentDate: 1586342400000,
        minutes: 60,
        price: 1000,
        expiredDate: 1586342400000
      })
    })

    afterEach(async () => {
      await Session.findByIdAndDelete(session._id)
    })

    it('La ruta funciona', async () => {
      const response = await request(app)
        .put(`/api/session/${session.sessionId}`)
        .send({
          tutorUserId: '6489d0b59fb69b703760f3fb',
          clientUserId: '648a5217a644d4cd59cc5884',
          appointmentDate: 1586342400000,
          minutes: 60,
          price: 1000,
          expiredDate: 1586342400000,
          isPaid: true,
          paymentDetails: {
            cardNumber: '1234567890123456',
            cardName: 'Test',
            expirationDate: 1586342400000,
            cvv: 123
          }
        })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Se actualiza correctamente', async () => {
      const response = await request(app)
        .put(`/api/session/${session.sessionId}`)
        .send({
          tutorUserId: '6489d0b59fb69b703760f3fb',
          clientUserId: '648a5217a644d4cd59cc5884',
          appointmentDate: 1586342400000,
          minutes: 60,
          price: 1000,
          expiredDate: 1586342400000,
          isPaid: true,
          paymentDetails: {
            cardNumber: '1234567890123456',
            cardName: 'Test',
            expirationDate: 1586342400000,
            cvv: 123
          },
          startedCounterDate: 1586342400000,
          endedCounterDate: 1586342400000
        })

      expect(response.body.sessionId).toBe(session.sessionId)
      expect(response.body.startedCounterDate).toBe(1586342400000)
    })
  })

  describe('DELETE/api/session/:id', () => {
    let session
    let response
    beforeEach(async () => {
      session = await Session.create({
        sessionId: '123456789',
        tutorUserId: '6489d0b59fb69b703760f3fb',
        clientUserId: '648a5217a644d4cd59cc5884',
        appointmentDate: 1586342400000,
        minutes: 60,
        price: 1000,
        expiredDate: 1586342400000
      })
      response = await request(app)
        .delete(`/api/session/${session.sessionId}`)
        .send()
    })

    it('La ruta funciona', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined()

      const foundsession = await Session.findById(session._id)
      expect(foundsession).toBeNull()
    })
  })
})
