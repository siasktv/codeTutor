const Cashouts = require('../../models/Cashouts.model.js')

const updateCashout = async (
  cashoutId,
  amount,
  paymentDetails,
  tutorId,
  status,
  sessionsPaid
) => {
  const updatedCashout = await Cashouts.findByIdAndUpdate(
    cashoutId,
    { amount, paymentDetails, tutorId, status, sessionsPaid },
    { new: true }
  )
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

  return updatedCashout
}

module.exports = updateCashout
