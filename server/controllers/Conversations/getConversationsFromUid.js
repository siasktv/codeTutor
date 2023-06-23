const Conversations = require('../../models/Conversation.model')
const Messages = require('../../models/Message.model')
const Tutor = require('../../models/Tutor.models')

const getConversationsFromUserId = async userId => {
  console.log('userId', userId)
  const conversations = await Conversations.find({
    members: { $in: userId }
  }).populate('members')

  const getTutor = async conversation => {
    const tutor = await Tutor.findOne({
      user: { $in: conversation.members.filter(member => member._id != userId) }
    }).populate('user')
    return tutor
  }

  const getLastMessage = async conversationId => {
    const lastMessage = await Messages.findOne({
      conversationId
    }).sort({ createdAt: -1 })
    return lastMessage
  }

  const conversationsWithLastMessageAndTutor = await Promise.all(
    conversations.map(async conversation => {
      const tutor = await getTutor(conversation)
      const lastMessage = await getLastMessage(conversation._id)
      return {
        ...conversation._doc,
        lastMessage,
        tutor
      }
    })
  )

  //sort conversations by last message
  conversationsWithLastMessageAndTutor.sort((a, b) => {
    if (a.lastMessage && b.lastMessage) {
      return b.lastMessage.createdAt - a.lastMessage.createdAt
    } else if (a.lastMessage) {
      return -1
    } else if (b.lastMessage) {
      return 1
    } else {
      return 0
    }
  })
  return conversationsWithLastMessageAndTutor
}

module.exports = getConversationsFromUserId
