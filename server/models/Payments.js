const { Schema, model } = require('mongoose')

const paymentsSchema = new Schema({
  uid: String,
  amount: Number,
  Card: {
    brand: String,
    last4: String,
    exp_month: Number,
    exp_year: Number,
    country: String,
    funding: String,
  },
  date: String,
  status: String,
  description: String,
  currency: String,
  client_secret: String,
  customer: String,
})

module.exports = model('Payment', paymentsSchema)
