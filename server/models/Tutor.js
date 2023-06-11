const { Schema, model } = require('mongoose')

const TutorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Tutor', TutorSchema)
