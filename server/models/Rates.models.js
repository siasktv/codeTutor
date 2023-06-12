const { Schema, model } = require('mongoose');

const RateSchema = new Schema(
  {
    tutor: { type: Types.ObjectId, ref: 'Tutor' },
    tutorRate: { type: Number },
    freelanceRate: { type: Number },
  },
  {
    timestamps: true,
  }
);


module.exports = model('Rate', RateSchema);