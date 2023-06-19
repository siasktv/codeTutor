const { Schema, model } = require('mongoose')
const { Types } = Schema

const ConversationSchema = new Schema(
  {
    members: [{ type: Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

module.exports = model('Conversation', ConversationSchema)
