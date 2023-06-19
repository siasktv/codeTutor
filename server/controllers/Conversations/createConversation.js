const Conversations = require('../../models/Conversation.model')

const createConversation = async members => {
  const newConversation = await Conversations.create({
    members
  })

  const newConversationPopulate = await Conversations.findById(
    newConversation._id
  ).populate({
    path: 'members'
  })
  return newConversationPopulate
}

module.exports = createConversation
