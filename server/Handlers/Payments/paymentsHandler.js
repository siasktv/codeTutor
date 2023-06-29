require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const FRONTEND_URL = process.env.FRONTEND_URL
const Payment = require('../../models/Payments')

const createPaymentIntent = async (req, res) => {
  console.log(req.body)
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId
    }
  })

  // console.log(customer)

  try {
    const paymentDetails = req.body

    // console.log(paymentDetails)

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: paymentDetails.amount * 100,
            product_data: {
              name: 'Session',
              description: paymentDetails.description
            }
          },
          quantity: 1
        }
      ],
      customer: customer.id,
      mode: 'payment',
      success_url: `${FRONTEND_URL}/meeting/${paymentDetails.sessionId}`,
      //pasarle
      cancel_url: `${FRONTEND_URL}`,
      payment_method_types: ['card'],
      invoice_creation: {
        enabled: true
      }
    })

    console.log(session)
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

//crear Payment
const createPayment = async (customer, data) => {
  console.log('userId:', customer.metadata.userId)
  const newPayment = new Payment({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    total: data.amount_total,
    payment_status: data.status,
    paymentData: data
  })
  try {
    const savedPayment = await newPayment.save()
    // console.log('Processed Payment:', savedPayment)
  } catch (err) {
    console.log(err)
  }
}

//webhooks para stripe

// const endpointSecret = process.env.endpointSecret

let endpointSecret

const handleWebhookEvent = async (request, response) => {
  const sig = request.headers['stripe-signature']

  let data
  let eventType

  if (endpointSecret) {
    let event

    try {
      const payload = JSON.stringify(request.rawBody)
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
      console.log('Webhook Verified')
    } catch (err) {
      console.log(`Webhook Error : ${err.message} `)
      response.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
  } else {
    data = request.body.data.object
    eventType = request.body.type
  }

  if (eventType === 'checkout.session.completed') {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      data.payment_intent,
      {
        expand: ['payment_method']
      }
    )

    console.log('PaymentIntent:', paymentIntent)

    const invoice = await stripe.invoices.retrieve(paymentIntent.invoice, {
      expand: ['payment_intent']
    })

    const receiptUrl = invoice.hosted_invoice_url

    console.log('Invoice:', receiptUrl)
    stripe.customers
      .retrieve(data.customer)
      .then(customer => {
        createPayment(customer, data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  response.send().end()
}

// Define the webhook route and attach the handleWebhookEvent function as the route handler

module.exports = { createPaymentIntent, handleWebhookEvent }
