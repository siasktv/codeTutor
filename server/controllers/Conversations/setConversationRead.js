const Conversations = require('../../models/Conversation.model')
const Messages = require('../../models/Message.model')

const setConversationRead = async (conversationId, userId) => {
  const conversation = await Conversations.findOne({
    _id: conversationId,
    members: { $in: userId }
  })
  if (!conversation) {
    throw new Error('Conversation not found')
  }
  await Messages.updateMany(
    {
      conversationId,
      sender: userId
    },
    { read: true }
  )

  return conversation
}

module.exports = setConversationRead
