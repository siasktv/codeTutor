const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');

const SkillsTech = require('../../models/SkillsTech.models');

describe('Pruebas sobre la API SkillsTech', () => {
  beforeAll(async () => {
    await mongoose.connect(
      'mongodb+srv://juan:BEBohWnVPzEdvbAb@codetutor.zrw5km4.mongodb.net/?retryWrites=true&w=majority'
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET /api/skillstech', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get('/api/skillstech').send();
    });

    it('La ruta funciona', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('La petición nos devuelve un array de skillsTech', async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/skillstech', () => {
    const newSkillsTech = {
      tutor: 'Tutor_id' ,
      techName: 'Tech_name',
      year: 1 ,
      description: 'Hola yo utilice la tech',
    };
    const wrongSkillsTech = { nombre: 'test skillsTech' };

    afterAll(async () => {
      await SkillsTech.deleteMany({ name: 'test skillsTech' });
    });

    it('La ruta funcione', async () => {
      const response = await request(app).post('/api/skillstech').send(newSkillsTech);

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('Se inserta correctamente', async () => {
      const response = await request(app).post('/api/skillstech').send(newSkillsTech);

      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBe(newSkillsTech.name);
    });

    it('Error en la inserción', async () => {
      const response = await request(app).post('/api/skillstech').send(wrongSkillsTech);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('PUT /api/skillstech', () => {
    let skillsTech;
    beforeEach(async () => {
      skillsTech = await SkillsTech.create({
        tutor: 'Tutor_id',
        techName: 'Tech_id',
        year: 1,
        description: 'Hola yo utilice la tech',
      });
    });

    afterEach(async () => {
      await SkillsTech.findByIdAndDelete(skillsTech._id);
    });

    it('La ruta funciona', async () => {
      const response = await request(app).put(`/api/skillstech/${skillsTech._id}`).send({
        name: 'skillsTech updated',
      });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('Se actualiza correctamente', async () => {
      const response = await request(app).put(`/api/skillstech/${skillsTech._id}`).send({
        name: 'skillsTech updated',
      });

      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBe('skillsTech updated');
    });
  });

  describe('DELETE /api/skillstech', () => {
    let skillsTech;
    let response;
    beforeEach(async () => {
      skillsTech = await SkillsTech.create({
        tutor: 'Tutor_id',
        techName: 'Tech_id',
        year: 1,
        description: 'Hola yo utilice la tech',
      });
      response = await request(app).delete(`/api/skillstech/${skillsTech._id}`).send();
    });

    it('La ruta funciona', () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    it('Borra correctamente', async () => {
      expect(response.body._id).toBeDefined();

      const foundSkillsTech = await Skill.findById(skillsTech._id);
      expect(foundSkillsTech).toBeNull();
    });
  });
});
