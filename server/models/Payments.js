const { Schema, model } = require('mongoose')

const paymentsSchema = new Schema(
  {
    //del sessionId sacamos tutorId y userId total amount
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'usd',
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed'],
      default: 'pending',
    },
    paymentData: {
      type: Object,
    },
    //guardamos data de stripe
  },
  {
    timestamps: true,
  }
)

module.exports = model('Payment', paymentsSchema)
