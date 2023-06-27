const Faqs = require('../../models/Faqs.models.js')

const getAllFaqs = async () => {
  const allFaqs = await Faqs.find().populate({
    path: 'user'
  })
  return allFaqs
}
module.exports = getAllFaqs
