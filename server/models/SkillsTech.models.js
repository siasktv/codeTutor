const { Schema, model } = require('mongoose')
const { Types } = Schema

const SkillsTechSchema = new Schema(
  {
    tutor: {
      type: Types.ObjectId,
      ref: 'Tutor'
    },
    techName: {
      type: Schema.Types.ObjectId,
      ref: 'Tech',
      required: true
    },
    years: {
      type: Number
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)
module.exports = model('SkillsTech', SkillsTechSchema)
