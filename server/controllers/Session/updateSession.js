const Session = require('../../models/Session.models')

const updateSession = async (
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
) => {
  const session = await Session.find({ sessionId: id })

  const updatedSession = await Session.findByIdAndUpdate(
    session[0]._id,
    {
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
    },
    { new: true }
  )
    .populate('tutorUserId')
    .populate('clientUserId')

  return updatedSession
}

module.exports = updateSession
