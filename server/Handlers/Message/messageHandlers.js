const createMessage = require('../../controllers/Message/createMessage.js')
const getMessagesFromConversation = require('../../controllers/Message/getMessagesFromConversation.js')

const createMessageHandler = async (req, res) => {
  const { conversationId, sender, message, read } = req.body
  if (!conversationId) {
    return res.status(400).json({ error: 'Conversation ID is required' })
  } else if (!sender) {
    return res.status(400).json({ error: 'Sender is required' })
  } else if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }
  try {
    const newMessage = await createMessage(
      conversationId,
      sender,
      message,
      read
    )
    res.status(200).json(newMessage)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getMessagesFromConversationHandler = async (req, res) => {
  const { conversationId } = req.params
  if (!conversationId) {
    return res.status(400).json({ error: 'Conversation ID is required' })
  }
  try {
    const messages = await getMessagesFromConversation(conversationId)
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createMessageHandler,
  getMessagesFromConversationHandler
}
