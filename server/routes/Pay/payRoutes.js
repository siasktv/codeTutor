const { Router } = require('express')
const router = Router()
const { payHandler } = require('../../Handlers/Pay/payHandlers.js')

router.post('/', payHandler)

module.exports = router
