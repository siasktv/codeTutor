// const storeItems = new Map()
// storeItems.set(1, { id: 1, name: 'Item 1', price: 10 })
// storeItems.set(2, { id: 2, name: 'Item 2', price: 20 })

require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const stripeHandler = async (req, res) => {
  console.log(req.body.cartItems)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.cartItems.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
        }
      }),
      mode: 'payment',
      // success_url: '',
      // cancel_url: '',
    })
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = stripeHandler
