const { Schema, model } = require('mongoose')
const { Types } = Schema

const ProjectSchema = new Schema(
  {
    tutor: {
      type: Types.ObjectId,
      ref: 'Tutor'
    },
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    end_date: {
      type: Date
    },
    description: {
      type: String,
      required: true
    },
    techName: [
      {
        type: Types.ObjectId,
        ref: 'Tech'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = model('Project', ProjectSchema)
