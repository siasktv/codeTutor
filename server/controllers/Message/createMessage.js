const Message = require('../../models/Message.model.js')

const createMessage = async (conversationId, sender, message, read) => {
  const newMessage = await Message.create({
    conversationId,
    sender,
    message,
    read
  })

  const newMessagePopulate = await Message.findById(newMessage._id)
    .populate({
      path: 'conversationId'
    })
    .populate({
      path: 'sender'
    })
  return newMessagePopulate
}

module.exports = createMessage
