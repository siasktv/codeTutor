const getAllSessions = require('../../controllers/Session/getAllSessions')
const getSessionById = require('../../controllers/Session/getSessionById')
const deleteSession = require('../../controllers/Session/deleteSession')
const createSession = require('../../controllers/Session/createSession')
const updateSession = require('../../controllers/Session/updateSession')

const getAllSessionsHandler = async (req, res) => {
  try {
    const allSessions = await getAllSessions()
    res.status(200).json(allSessions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getSessionByIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const session = await getSessionById(id)
    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteSessionHandler = async (req, res) => {
  const { id } = req.params
  try {
    const deletedSession = await deleteSession(id)
    res.status(200).json(deletedSession)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createSessionHandler = async (req, res) => {
  const {
    sessionId,
    tutorUserId,
    clientUserId,
    appointmentDate,
    minutes,
    price,
    expiredDate
  } = req.body
  if (
    !sessionId ||
    !tutorUserId ||
    !clientUserId ||
    !appointmentDate ||
    !minutes ||
    !price ||
    !expiredDate
  ) {
    return res.status(400).json({ error: 'Faltan datos' })
  }
  try {
    const session = await createSession(
      sessionId,
      tutorUserId,
      clientUserId,
      appointmentDate,
      minutes,
      price,
      expiredDate
    )
    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateSessionHandler = async (req, res) => {
  const {
    isPaid,
    paymentDetails,
    clientHasJoined,
    tutorHasJoined,
    startedCounterDate,
    endedCounterDate,
    isCancelled,
    expiredDate,
    isRefunded,
    isReviewed,
    isDisputed
  } = req.body
  const { id } = req.params

  try {
    const session = await updateSession(
      id,
      isPaid,
      paymentDetails,
      clientHasJoined,
      tutorHasJoined,
      startedCounterDate,
      endedCounterDate,
      isCancelled,
      expiredDate,
      isRefunded,
      isReviewed,
      isDisputed
    )
    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllSessionsHandler,
  getSessionByIdHandler,
  deleteSessionHandler,
  createSessionHandler,
  updateSessionHandler
}
