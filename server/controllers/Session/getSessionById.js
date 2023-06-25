const Session = require('../../models/Session.models')

const getSessionById = async id => {
  const session = await Session.find({ sessionId: id })

  const sessionPopulate = await Session.findById(session[0]._id)
    .populate('tutorUserId')
    .populate('clientUserId')

  return sessionPopulate
}

module.exports = getSessionById
