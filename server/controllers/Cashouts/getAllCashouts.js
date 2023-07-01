const Cashouts = require('../../models/Cashouts.model.js')

const getAllCashouts = async () => {
  const cashouts = await Cashouts.find()
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

module.exports = getAllCashouts
