const createConversation = require('../../controllers/Conversations/createConversation.js')
const getConversationByMembers = require('../../controllers/Conversations/getConversationByMembers.js')
const getConversationsFromUserId = require('../../controllers/Conversations/getConversationsFromUid.js')
const setConversationRead = require('../../controllers/Conversations/setConversationRead.js')

const createConversationHandler = async (req, res) => {
  const { members } = req.body
  if (!members) {
    return res.status(400).json({ error: 'Members are required' })
  } else if (members.length < 2) {
    return res.status(400).json({ error: 'Too few members' })
  } else if (members.length > 2) {
    return res.status(400).json({ error: 'Too many members' })
  }

  try {
    const conversation = await getConversationByMembers(members)
    if (conversation) {
      return res.status(400).json({ error: 'Conversation already exists' })
    }
    const newConversation = await createConversation(members)
    res.status(200).json(newConversation)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getConversationByMembersHandler = async (req, res) => {
  const { userId, otherUserId } = req.params
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  } else if (!otherUserId) {
    return res.status(400).json({ error: 'Other User ID is required' })
  }

  try {
    const conversation = await getConversationByMembers([userId, otherUserId])
    if (!conversation) {
      const createConversationAction = await createConversation([
        userId,
        otherUserId
      ])
      return res.status(200).json(createConversationAction)
    }
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getConversationsFromUserIdHandler = async (req, res) => {
  const { userId } = req.params

  try {
    const conversations = await getConversationsFromUserId(userId)
    res.status(200).json(conversations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const setConversationReadHandler = async (req, res) => {
  const { conversationId } = req.params
  const { userId } = req.body

  try {
    const conversation = await setConversationRead(conversationId, userId)
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createConversationHandler,
  getConversationByMembersHandler,
  getConversationsFromUserIdHandler,
  setConversationReadHandler
}
