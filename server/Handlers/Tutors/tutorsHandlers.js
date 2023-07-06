const createTutor = require('../../controllers/Tutors/createTutor.js')
const getTutorById = require('../../controllers/Tutors/getTutorById.js')
const getAllTutors = require('../../controllers/Tutors/getAllTutors.js')
const deleteTutor = require('../../controllers/Tutors/deleteTutor.js')
const updateTutor = require('../../controllers/Tutors/updateTutor.js')
const sendAcceptTutorEmail = require('../../utils/tutors/acceptMail.js')
const sendRejectTutorEmail = require('../../utils/tutors/rejectMail.js')
const sendDisableTutorEmail = require('../../utils/tutors/disableMail.js')
const sendEnableTutorEmail = require('../../utils/tutors/enableMail.js')
const updateUser = require('../../controllers/Users/updateUser.js')

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
    fullName,
    disponibility
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
      fullName,
      disponibility
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
    offline,
    disponibility
  } = req.body

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
      offline,
      disponibility
    })
    res.status(200).json(updatedTutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const acceptTutorHandler = async (req, res) => {
  const { id } = req.params
  try {
    const acceptedTutor = await updateTutor(id, { status: 'approved' })
    const acceptedUser = await updateUser(acceptedTutor.user._id, {
      role: 'Tutor'
    })
    const user = acceptedTutor.user
    sendAcceptTutorEmail(user)
    res.status(200).json(acceptedTutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const rejectTutorHandler = async (req, res) => {
  const { id } = req.params
  try {
    const rejectedTutor = await updateTutor(id, { status: 'rejected' })
    const rejectedUser = await updateUser(rejectedTutor.user._id, {
      role: 'Client'
    })
    const user = rejectedTutor.user
    sendRejectTutorEmail(user)
    res.status(200).json(rejectedTutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const disableTutorHandler = async (req, res) => {
  const { id } = req.params
  try {
    const disabledTutor = await updateTutor(id, { status: 'rejected' })
    const disabledUser = await updateUser(disabledTutor.user._id, {
      role: 'Client'
    })
    const user = disabledTutor.user
    sendDisableTutorEmail(user)
    res.status(200).json(disabledTutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const enableTutorHandler = async (req, res) => {
  const { id } = req.params
  try {
    const enabledTutor = await updateTutor(id, { status: 'approved' })
    const enabledUser = await updateUser(enabledTutor.user._id, {
      role: 'Tutor'
    })
    const user = enabledTutor.user
    sendEnableTutorEmail(user)
    res.status(200).json(enabledTutor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllTutorsHandler,
  getTutorByIdHandler,
  createTutorHandler,
  deleteTutorHandler,
  updateTutorHandler,
  acceptTutorHandler,
  rejectTutorHandler,
  disableTutorHandler,
  enableTutorHandler
}
