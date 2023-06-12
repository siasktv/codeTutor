const { Schema, model } = require('mongoose');

const SkillsTechSchema = new Schema(
  {
    tutor: { type: Types.ObjectId, ref: 'Tutor' },
    techName: { type: Types.ObjectId, ref: 'Tech' , required: true },
    year: { type: Number },
    description: { type: String},
  },
  {
    timestamps: true,
  }
);
module.exports = model('SkillsTech', SkillsTechSchema);
