const submitPayment = require('../../controllers/Pay/submitPayment')

const payHandler = async (req, res) => {
  const { sessions, payment, userId, tutorId } = req.body
  if (!sessions || !payment || !userId || !tutorId) {
    return res.status(400).json({ error: 'Faltan datos' })
  }
  try {
    const newCashout = await submitPayment({
      sessions,
      payment,
      userId,
      tutorId
    })
    res.status(200).json(newCashout)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { payHandler }
