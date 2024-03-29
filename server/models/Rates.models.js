const { Schema, model } = require('mongoose')
const { Types } = Schema

const RateSchema = new Schema(
  {
    tutor: { type: Types.ObjectId, ref: 'Tutor' },
    mentorshipRate: { type: Number },
    freelanceRate: { type: Number }
  },
  {
    timestamps: true
  }
)

module.exports = model('Rate', RateSchema)
