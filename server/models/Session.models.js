const { Schema, model } = require('mongoose')

const SessionSchema = new Schema(
  {
    sessionId: {
      type: Number,
      required: true
    },
    tutorUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    clientUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    appointmentDate: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paymentDetails: {
      type: Object,
      default: null
    },
    meetLink: {
      type: String,
      default: null
    },
    //referencia del pago
    clientHasJoined: {
      type: Boolean,
      default: false
    },
    tutorHasJoined: {
      type: Boolean,
      default: false
    },
    startedCounterDate: {
      type: Number,
      default: null
    },
    endedCounterDate: {
      type: Number,
      default: null
    },
    expiredDate: {
      type: Number,
      required: true
    },
    isCancelled: {
      type: Boolean,
      default: false
    },
    isRefunded: {
      type: Boolean,
      default: false
    },
    isReviewed: {
      type: Boolean,
      default: false
    },
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: 'Reviews',
      default: null
    },
    isDisputed: {
      type: Boolean,
      default: false
    },
    paymentAlert: {
      type: Boolean,
      default: false
    },
    sentPaymentToTutor: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Session', SessionSchema)
