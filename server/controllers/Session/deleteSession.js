const Session = require('../../models/Session.models')

const deleteSession = async id => {
  const session = await Session.find({ sessionId: id })

  const deletedSession = await Session.findByIdAndDelete(session[0]._id)

  return deletedSession
}

module.exports = deleteSession
