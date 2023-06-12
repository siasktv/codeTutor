const { Schema, model } = require('mongoose')

const ExperienceSchema = new Schema(
  {
    tutor: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor',
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    techName: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tech',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = model('Experience', ExperienceSchema)
