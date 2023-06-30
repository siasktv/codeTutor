const getCashoutsFromUserId = require('../../controllers/Cashouts/getCashoutsFromUserId.js')
const createCashout = require('../../controllers/Cashouts/createCashout.js')
const updateCashout = require('../../controllers/Cashouts/updateCashout.js')

const getCashoutsFromUserIdHandler = async (req, res) => {
  const { userId } = req.params

  try {
    const cashouts = await getCashoutsFromUserId(userId)
    res.status(200).json(cashouts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createCashoutHandler = async (req, res) => {
  const { userId, amount, paymentDetails, tutorId, status, sessionsPaid } =
    req.body
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  } else if (!amount) {
    return res.status(400).json({ error: 'Amount is required' })
  } else if (!paymentDetails) {
    return res.status(400).json({ error: 'Payment Details are required' })
  } else if (!tutorId) {
    return res.status(400).json({ error: 'Tutor ID is required' })
  } else if (!status) {
    return res.status(400).json({ error: 'Status is required' })
  } else if (!sessionsPaid) {
    return res.status(400).json({ error: 'Sessions Paid is required' })
  }

  try {
    const newCashout = await createCashout(
      userId,
      amount,
      paymentDetails,
      tutorId,
      status,
      sessionsPaid
    )
    res.status(200).json(newCashout)
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(error)
  }
}

const updateCashoutHandler = async (req, res) => {
  const { cashoutId, amount, paymentDetails, tutorId, status, sessionsPaid } =
    req.body
  if (!cashoutId) {
    return res.status(400).json({ error: 'Cashout ID is required' })
  }

  try {
    const updatedCashout = await updateCashout(
      cashoutId,
      amount,
      paymentDetails,
      tutorId,
      status,
      sessionsPaid
    )
    res.status(200).json(updatedCashout)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getCashoutsFromUserIdHandler,
  createCashoutHandler,
  updateCashoutHandler
}
