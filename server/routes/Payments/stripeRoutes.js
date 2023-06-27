const { Router } = require('express')
const router = Router()
const createPaymentIntent = require('../../Handlers/Payments/paymentsHandler')

router.post('/create-checkout-session', createPaymentIntent)

module.exports = router
