const { Router } = require('express')
const router = Router()

const {
  getCashoutsFromUserIdHandler,
  createCashoutHandler,
  updateCashoutHandler,
  getAllCashoutsHandler
} = require('../../Handlers/Cashouts/cashoutsHandlers.js')

router.get('/:userId', getCashoutsFromUserIdHandler)
router.post('/', createCashoutHandler)
router.put('/:cashoutId', updateCashoutHandler)
router.get('/', getAllCashoutsHandler)

module.exports = router
