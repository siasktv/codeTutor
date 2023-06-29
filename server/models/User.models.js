const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true
      // validate: emailValidator,
    },

    image: {
      type: String
    },
    location: {
      type: String
    },
    timezone: {
      type: String
    },
    role: {
      type: String,
      enum: ['Tutor', 'Client'],
      require: true
    },
    register_date: {
      type: Date,
      default: Date.now
    },
    offline: {
      type: Boolean,
      default: false
    },
    admin: {
      type: Boolean,
      default: false
    },
    uid: {
      type: String,
      required: true
    },
    favoritesTutor: [{ type: Schema.Types.ObjectId, ref: 'Tutor' }],
    payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    notifications: [
      {
        type: Object
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = model('User', UserSchema)
