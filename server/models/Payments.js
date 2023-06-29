const { Schema, model } = require('mongoose')

const paymentsSchema = new Schema(
  {
    userId: { type: String, required: true },
    customerId: { type: String },
    paymentIntentId: { type: String },

    total: { type: Number, required: true },

    payment_status: { type: String, required: true },

    paymentData: { type: Object, required: true },

    // recipeURL: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Payment', paymentsSchema)
