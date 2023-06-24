const Session = require('../../models/Session.models')

const createSession = async (
  sessionId,
  tutorUserId,
  clientUserId,
  appointmentDate,
  minutes,
  price,
  expiredDate
) => {
  const newSession = await Session.create({
    sessionId,
    tutorUserId,
    clientUserId,
    appointmentDate,
    minutes,
    price,
    expiredDate
  })

  sessionPopulate = await Session.findById(newSession._id)
    .populate('tutorUserId')
    .populate('clientUserId')

  return sessionPopulate
}

module.exports = createSession
