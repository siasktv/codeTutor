const { Schema, model } = require('mongoose')
const { Types } = Schema

const CashoutsSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    tutorId: { type: Types.ObjectId, ref: 'Tutor', required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    sessionsPaid: [{ type: Types.ObjectId, ref: 'Session' }],
    paymentDetails: { type: Object, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = model('Cashouts', CashoutsSchema)
