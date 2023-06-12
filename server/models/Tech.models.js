const { Schema, model } = require('mongoose');

const TechSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Web App',
        'Mobile App',
        'Lenguajes',
        'Ciencia de Datos',
        'Base de Datos',
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Tech', TechSchema);
