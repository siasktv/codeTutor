const { Router } = require('express')

const {
  getAllSessionsHandler,
  getSessionByIdHandler,
  deleteSessionHandler,
  createSessionHandler,
  updateSessionHandler
} = require('../../Handlers/Session/sessionHandlers')

const router = Router()

router.get('/', getAllSessionsHandler)
router.get('/:id', getSessionByIdHandler)
router.delete('/:id', deleteSessionHandler)
router.post('/', createSessionHandler)
router.put('/:id', updateSessionHandler)

module.exports = router
