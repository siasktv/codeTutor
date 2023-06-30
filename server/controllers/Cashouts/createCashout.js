const Cashouts = require('../../models/Cashouts.model.js')

const createCashout = async (
  userId,
  amount,
  paymentDetails,
  tutorId,
  status,
  sessionsPaid
) => {
  console.log(userId, amount, paymentDetails, tutorId, status, sessionsPaid)
  const newCashout = await Cashouts.create({
    userId,
    amount,
    paymentDetails,
    tutorId,
    status,
    sessionsPaid
  })

  const newCashoutPopulate = await Cashouts.findById(newCashout._id)
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

  return newCashoutPopulate
}

module.exports = createCashout
