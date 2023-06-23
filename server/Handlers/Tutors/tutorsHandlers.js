const createTutor = require('../../controllers/Tutors/createTutor.js')
const getTutorById = require('../../controllers/Tutors/getTutorById.js')
const getAllTutors = require('../../controllers/Tutors/getAllTutors.js')
const deleteTutor = require('../../controllers/Tutors/deleteTutor.js')
const updateTutor = require('../../controllers/Tutors/updateTutor.js')

const getAllTutorsHandler = async (req, res) => {
  try {
    const allTutors = await getAllTutors()
    res.status(200).json(allTutors)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getTutorByIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const tutor = await getTutorById(id)
    res.status(200).json(tutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createTutorHandler = async (req, res) => {
  const {
    user,
    avatar,
    location,
    timezone,
    socialMedia,
    languages,
    bio,
    experience,
    skills,
    projects,
    rates,
    fullName
  } = req.body
  if (!user) {
    res.status(400).json({ error: 'User is required' })
  }
  try {
    const tutor = await createTutor({
      user,
      avatar,
      location,
      timezone,
      socialMedia,
      languages,
      bio,
      experience,
      skills,
      projects,
      rates,
      fullName
    })
    res.status(200).json(tutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteTutorHandler = async (req, res) => {
  const { id } = req.params
  try {
    const deletedTutor = await deleteTutor(id)
    res.status(200).json(deletedTutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateTutorHandler = async (req, res) => {
  const { id } = req.params
  const {
    user,
    bio,
    languages,
    skills,
    experience,
    projects,
    reviews,
    rates,
    bankAccount,
    status,
    socialMedia,
    offline
  } = req.body
  if (!user) {
    res.status(400).json({ error: 'User is required' })
  }
  try {
    const updatedTutor = await updateTutor(id, {
      user,
      bio,
      languages,
      skills,
      experience,
      projects,
      reviews,
      rates,
      bankAccount,
      status,
      socialMedia,
      offline
    })
    res.status(200).json(updatedTutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllTutorsHandler,
  getTutorByIdHandler,
  createTutorHandler,
  deleteTutorHandler,
  updateTutorHandler
}
