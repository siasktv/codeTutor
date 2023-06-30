const { Router } = require('express')
const router = Router()

const {
  getCashoutsFromUserIdHandler,
  createCashoutHandler,
  updateCashoutHandler
} = require('../../Handlers/Cashouts/cashoutsHandlers.js')

router.get('/:userId', getCashoutsFromUserIdHandler)
router.post('/', createCashoutHandler)
router.put('/:cashoutId', updateCashoutHandler)

module.exports = router
