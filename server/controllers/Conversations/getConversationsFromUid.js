const Conversations = require('../../models/Conversation.model')

const getConversationsFromUserId = async userId => {
  console.log('userId', userId)
  const conversations = await Conversations.find({
    members: { $in: userId }
  }).populate({
    path: 'members'
  })

  return conversations
}

module.exports = getConversationsFromUserId
