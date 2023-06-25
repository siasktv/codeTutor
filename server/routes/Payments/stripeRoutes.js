const { Router } = require('express')
const router = Router()
const stripeHandler = require('../../Handlers/Stripe/stripeHandler')

router.post('/create-checkout-session', stripeHandler)

module.exports = router
