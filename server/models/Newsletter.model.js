const { Schema, model } = require('mongoose')
const { Types } = Schema

const NewsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Newsletter', NewsletterSchema)
