const { Schema, model } = require('mongoose')
const { Types } = Schema

const MessageSchema = new Schema(
  {
    conversationId: { type: Types.ObjectId, ref: 'Conversation' },
    sender: { type: Types.ObjectId, ref: 'User' },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Message', MessageSchema)
