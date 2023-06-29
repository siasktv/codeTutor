const { Router } = require('express')
const express = require('express')
const router = Router()
const {
  createPaymentIntent,
  handleWebhookEvent,
} = require('../../Handlers/Payments/paymentsHandler')

router.post('/create-checkout-session', createPaymentIntent)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhookEvent
)

module.exports = router
