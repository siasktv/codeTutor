require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const FRONTEND_URL = process.env.FRONTEND_URL
const Payment = require('../../models/Payments')
const User = require('../../models/User.models')
const Session = require('../../models/Session.models')

const createPaymentIntent = async (req, res) => {
  // console.log(req.body)
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      sessionId: req.body.sessionId
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
              name: paymentDetails.name,
              description: paymentDetails.description
            }
          },
          quantity: 1
        }
      ],
      customer: customer.id,
      mode: 'payment',
      success_url: `${FRONTEND_URL}/meeting/${paymentDetails.sessionId}?success=true`,
      //pasarle
      cancel_url: `${FRONTEND_URL}/meeting/${paymentDetails.sessionId}`,
      payment_method_types: ['card'],
      invoice_creation: {
        enabled: true
      }
    })

    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

//crear Payment
const createPayment = async (customer, data, paymentIntent, receiptUrl) => {
  const newPayment = new Payment({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    total: data.amount_total,
    payment_status: data.status,
    paymentData: {
      ...data,
      paymentIntent: paymentIntent
    },
    receiptUrl: receiptUrl
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
  const sessions = request.sessions
  const users = request.users
  const getUser = userId => {
    return users.find(user => user.userId === userId)
  }
  const getSession = sessionId => {
    return sessions.find(session => session.id === Number(sessionId))
  }

  const io = request.io
  const sig = request.headers['stripe-signature']

  let data
  let eventType

  if (endpointSecret) {
    let event

    try {
      const payload = JSON.stringify(request.rawBody)
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
      // console.log('Webhook Verified')
    } catch (err) {
      // console.log(`Webhook Error : ${err.message} `)
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

    // console.log('PaymentIntent:', paymentIntent)

    const invoice = await stripe.invoices.retrieve(paymentIntent.invoice, {
      expand: ['payment_intent']
    })

    const receiptUrl = invoice.hosted_invoice_url

    // console.log('Invoice:', receiptUrl)
    stripe.customers
      .retrieve(data.customer)
      .then(async customer => {
        createPayment(customer, data, paymentIntent, receiptUrl)
        const session = await getSession(customer.metadata.sessionId)
        const user = await getUser(session.clientUserId)
        const tutor = await getUser(session.tutorUserId)
        // console.log('User:', user)
        session.paymentDetails = {
          date: data.created,
          amount: data.amount_total,
          card: {
            brand: paymentIntent.payment_method.card.brand,
            type: paymentIntent.payment_method.card.funding,
            last4: paymentIntent.payment_method.card.last4,
            exp_month: paymentIntent.payment_method.card.exp_month,
            exp_year: paymentIntent.payment_method.card.exp_year
          },
          receiptUrl: receiptUrl
        }
        session.isPaid = true
        if (user) {
          io.to(user.socketId).emit('setSessionData', {
            session
          })
        }
        if (tutor) {
          io.to(tutor.socketId).emit('setSessionData', {
            session
          })
          const notificationId = Math.random().toString(36).substr(2, 9)
          io.to(tutor.socketId).emit('setNotifications', {
            notifications: [
              ...tutor.notifications,
              {
                id: notificationId,
                alerted: tutor.online ? false : true,
                type: 'link',
                message: `El cliente ${user.userInfo.fullName} ha abonado la sesión`,
                sender: user.userInfo,
                receiver: tutor.userInfo,
                createdAt: Date.now(),
                isRead: false,
                link: `/meeting/${customer.metadata.sessionId}`
              }
            ]
          })
          tutor.notifications = [
            ...tutor.notifications,
            {
              id: notificationId,
              alerted: tutor.online ? false : true,
              type: 'link',
              message: `El cliente ${user.userInfo.fullName} ha abonado la sesión`,
              sender: user.userInfo,
              receiver: tutor.userInfo,
              createdAt: Date.now(),
              isRead: false,
              link: `/meeting/${customer.metadata.sessionId}`
            }
          ]

          const NotificationToDb = async () => {
            try {
              const userToDb = await User.findOne({ _id: tutor.userId })
              const notificationTo = {
                id: notificationId,
                alerted: tutor.online ? false : true,
                type: 'link',
                message: `El cliente ${user.userInfo.fullName} ha abonado la sesión`,
                sender: user.userInfo,
                receiver: tutor.userInfo,
                createdAt: Date.now(),
                isRead: false,
                link: `/meeting/${customer.metadata.sessionId}`
              }
              userToDb.notifications = [
                ...userToDb.notifications,
                notificationTo
              ]
              await userToDb.save()
            } catch (err) {
              console.log(err)
            }
          }
          NotificationToDb()
        }

        const sessionToDb = async () => {
          try {
            await Session.findOneAndUpdate(
              { sessionId: Number(customer.metadata.sessionId) },
              {
                isPaid: true,
                paymentDetails: {
                  date: data.created,
                  amount: data.amount_total,
                  card: {
                    brand: paymentIntent.payment_method.card.brand,
                    type: paymentIntent.payment_method.card.funding,
                    last4: paymentIntent.payment_method.card.last4,
                    exp_month: paymentIntent.payment_method.card.exp_month,
                    exp_year: paymentIntent.payment_method.card.exp_year
                  },
                  receiptUrl: receiptUrl
                }
              }
            )
          } catch (error) {
            console.log(error)
          }
        }
        sessionToDb()
      })
      .catch(err => {
        console.log(err)
      })
  }

  response.send().end()
}

// Define the webhook route and attach the handleWebhookEvent function as the route handler

module.exports = { createPaymentIntent, handleWebhookEvent }
