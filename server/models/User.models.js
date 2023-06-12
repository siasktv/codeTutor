const { Schema, model } = require('mongoose')
const validator = require('mongoose-validator')

const emailValidator = [
  validator({
    validator: 'isEmail',
    message: 'Ingrese un Email Valido',
  }),
]

const passwordValidator = [
  validator({
    validator: 'isLength',
    arguments: [6, 15],
    message: 'El password debe tener entre 6 y 15 caracteres',
  }),
  validator({
    validator: (value) => /^(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value),
    message:
      'El password debe contener al menos una mayúscula y un caracter especial',
  }),
]

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      validate: emailValidator,
    },
    password: {
      type: String,
      required: true,
      validate: passwordValidator,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Tutor', 'Client'],
      require: true,
    },
    register_date: {
      type: Date,
      default: Date.now,
    },
    offline: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', UserSchema)
