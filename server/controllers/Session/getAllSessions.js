const Session = require('../../models/Session.models')

const getAllSessions = async () => {
  const allSessions = await Session.find()
    .populate('tutorUserId')
    .populate('clientUserId')

  return allSessions
}

module.exports = getAllSessions
