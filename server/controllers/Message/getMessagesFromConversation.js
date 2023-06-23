const Message = require('../../models/Message.model.js')

const getMessagesFromConversation = async conversationId => {
  const messages = await Message.find({
    conversationId
  })
    .populate({
      path: 'conversationId'
    })
    
  return messages
}

module.exports = getMessagesFromConversation
