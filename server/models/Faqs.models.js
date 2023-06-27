const { Schema, model } = require('mongoose');

const FaqsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    question: {
      type: String,
    },
    sugessted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
  
);


module.exports = model('Faqs', FaqsSchema);