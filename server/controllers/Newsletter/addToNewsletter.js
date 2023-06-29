const Newsletter = require('../../models/Newsletter.model.js')

const addToNewsletter = async email => {
  const newEmail = await Newsletter.create({ email })
  return newEmail
}

module.exports = addToNewsletter
