const { Router } = require('express')
const router = Router()
const {
  getConversationsFromUserIdHandler,
  getConversationByMembersHandler,
  createConversationHandler
} = require('../../Handlers/Conversations/conversationsHandlers.js')

router.post('/', createConversationHandler)
router.get('/:userId', getConversationsFromUserIdHandler)
router.get('/:userId/:otherUserId', getConversationByMembersHandler)

module.exports = router
