const { Router } = require('express')
const router = Router()
const {
  addToNewsletterHandler,
  getNewsletterHandler,
  deleteFromNewsletterHandler
} = require('../../Handlers/Newsletter/newsletterHandlers')

router.post('/', addToNewsletterHandler)
router.get('/', getNewsletterHandler)
router.delete('/', deleteFromNewsletterHandler)

module.exports = router
