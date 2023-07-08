const Cashouts = require('../../models/Cashouts.model.js')

const getCashoutsFromUserId = async userId => {
  const cashouts = await Cashouts.find({ userId })
    .populate({
      path: 'userId'
    })
    .populate({
      path: 'tutorId'
    })
    .populate({
      path: 'sessionsPaid',
      populate: {
        path: 'clientUserId'
      }
    })
  return cashouts
}

module.exports = getCashoutsFromUserId
