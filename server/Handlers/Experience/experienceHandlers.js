const createExperience = require('../../controllers/Experience/createExperience.js')
const deleteExperience = require('../../controllers/Experience/deleteExperience.js')
const getAllExperiences = require('../../controllers/Experience/getAllExperiences.js')
const updateExperience = require('../../controllers/Experience/updateExperience.js')
const getExperienceById = require('../../controllers/Experience/getExperienceById.js')
const getAllExperiencesByTutorId = require('../../controllers/Experience/getAllExperiencesByTutorId.js')

const createExperienceHandler = async (req, res) => {
  const {
    tutor,
    position,
    company,
    techName,
    location,
    start_date,
    end_date,
    description,
    current
  } = req.body
  if (!position || position.trim().length === 0) {
    return res.status(400).json({ error: 'Position is required' })
  }
  if (!company || company.trim().length === 0) {
    return res.status(400).json({ error: 'Company is required' })
  }
  if (!start_date || !Date.parse(start_date)) {
    return res.status(400).json({ error: 'Invalid start date' })
  }

  if (!end_date || !Date.parse(end_date)) {
    return res.status(400).json({ error: 'Invalid end date' })
  }

  try {
    const newExperience = await createExperience({
      tutor,
      position,
      company,
      location,
      techName,
      start_date,
      end_date,
      description,
      current
    })
    res.status(200).json(newExperience)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteExperienceHandler = async (req, res) => {
  const { id } = req.params

  try {
    const deletedExperience = await deleteExperience(id)
    res.status(200).json(deletedExperience)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllExperiencesHandler = async (req, res) => {
  try {
    const allExperiences = await getAllExperiences()
    res.status(200).json(allExperiences)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getExperienceByTutorIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const allExperiencesByTutorId = await getAllExperiencesByTutorId(id)
    res.status(200).json(allExperiencesByTutorId)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updatedExperienceHandler = async (req, res) => {
  const { id } = req.params
  const {
    tutor,
    position,
    company,
    location,
    start_date,
    end_date,
    description,
    techName,
    current
  } = req.body
  if (!position || position.trim().length === 0) {
    return res.status(400).json({ error: 'Position is required' })
  }
  if (!company || company.trim().length === 0) {
    return res.status(400).json({ error: 'Link is required' })
  }
  if (!start_date || !Date.parse(start_date)) {
    return res.status(400).json({ error: 'Invalid start date' })
  }

  if (!end_date || !Date.parse(end_date)) {
    return res.status(400).json({ error: 'Invalid end date' })
  }
  try {
    const updatedExperience = await updateExperience(id, {
      tutor,
      position,
      company,
      location,
      start_date,
      end_date,
      description,
      techName,
      current
    })
    res.status(200).json(updatedExperience)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getExperienceByIdHandler = async (req, res) => {
  const { id } = req.params

  try {
    const experienceById = await getExperienceById(id)
    res.status(200).json(experienceById)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createExperienceHandler,
  deleteExperienceHandler,
  getAllExperiencesHandler,
  updatedExperienceHandler,
  updatedExperienceHandler,
  getExperienceByIdHandler,
  getExperienceByTutorIdHandler
}
