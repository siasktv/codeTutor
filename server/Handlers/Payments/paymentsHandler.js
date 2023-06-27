require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const Session = require('../../models/Session.models')

const createPaymentIntent = async (req, res) => {
  try {
    const { priceId } = req.body

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 2000,
            product_data: {
              name: 'T-shirt',
              description: 'Comfortable cotton t-shirt',
              images: ['https://example.com/t-shirt.png'],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173',
      cancel_url: 'http://localhost:5173',
    })

    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = createPaymentIntent
