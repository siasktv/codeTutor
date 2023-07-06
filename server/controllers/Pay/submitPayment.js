const Sessions = require('../../models/Session.models')
const Cashouts = require('../../models/Cashouts.model')

const submitPayment = async ({ sessions, payment, userId, tutorId }) => {
  sessions.forEach(async session => {
    await Sessions.findByIdAndUpdate(session, { sentPaymentToTutor: true })
  })

  const newCashout = await Cashouts.create({
    userId,
    tutorId,
    amount: payment.amount,
    status: payment.status,
    sessionsPaid: sessions,
    paymentDetails: payment
  })
  return newCashout
}

module.exports = submitPayment
