const addToNewsletter = require('../../controllers/Newsletter/addToNewsletter.js')
const getNewsletter = require('../../controllers/Newsletter/getNewsletter.js')
const deleteFromNewsletter = require('../../controllers/Newsletter/deleteFromNewsletter.js')
const sendEmailNewsletter = require('../../utils/newsletter/mail.js')
const Newsletter = require('../../models/Newsletter.model.js')

const addToNewsletterHandler = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  const find = await Newsletter.findOne({ email })
  if (find) {
    return res.status(400).json({ error: 'Email already exists' })
  }
  try {
    const newEmail = await addToNewsletter(email)
    await sendEmailNewsletter(email)
    res.status(200).json(newEmail)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getNewsletterHandler = async (req, res) => {
  try {
    const newsletter = await getNewsletter()
    res.status(200).json(newsletter)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteFromNewsletterHandler = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  try {
    const deletedEmail = await deleteFromNewsletter(email)
    res.status(200).json(deletedEmail)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  addToNewsletterHandler,
  getNewsletterHandler,
  deleteFromNewsletterHandler
}
