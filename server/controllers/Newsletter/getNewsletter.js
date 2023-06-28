const Newsletter = require('../../models/Newsletter.model.js')

const getNewsletter = async () => {
  const newsletter = await Newsletter.find()
  return newsletter
}

module.exports = getNewsletter
