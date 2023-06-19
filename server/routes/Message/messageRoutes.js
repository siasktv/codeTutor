const { Router } = require('express')
const router = Router()
const {
  createMessageHandler,
  getMessagesFromConversationHandler
} = require('../../Handlers/Message/messageHandlers')

router.post('/', createMessageHandler)
router.get('/:conversationId', getMessagesFromConversationHandler)

module.exports = router
