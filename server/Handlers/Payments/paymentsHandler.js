require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const FRONTEND_URL = process.env.FRONTEND_URL
const Session = require('../../models/Session.models')

const createPaymentIntent = async (req, res) => {
  try {
    const paymentDetails = req.body

    console.log(paymentDetails)

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: paymentDetails.amount * 100,
            product_data: {
              name: 'Session',
              description: paymentDetails.description,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${FRONTEND_URL}/meeting/${paymentDetails.sessionId}`,
      //pasarle
      cancel_url: `${FRONTEND_URL}`,
    })

    console.log(session)
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = createPaymentIntent
