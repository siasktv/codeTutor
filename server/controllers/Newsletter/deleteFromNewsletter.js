const Newsletter = require('../../models/Newsletter.model.js')

const deleteFromNewsletter = async email => {
  const deleted = await Newsletter.findOneAndDelete({ email })
  return deleted
}

module.exports = deleteFromNewsletter
