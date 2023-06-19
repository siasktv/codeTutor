const Message = require('../../models/Message.model')

const getMessagesFromConversation = async conversationId => {
  const messages = await Message.find({
    conversationId
  })
    .populate({
      path: 'conversationId'
    })
    .populate({
      path: 'sender'
    })
  return messages
}

module.exports = getMessagesFromConversation
