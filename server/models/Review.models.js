const { Schema, model } = require('mongoose')

const ReviewsSchema = new Schema(
  {
    tutor: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor'
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    comment: {
      type: String
    },
    rating: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Reviews', ReviewsSchema)
