const Conversations = require('../../models/Conversation.model.js')

const getConversationByMembers = async members => {
  const conversation = await Conversations.findOne({
    members: { $all: members }
  }).populate({
    path: 'members'
  })

  return conversation
}

module.exports = getConversationByMembers
