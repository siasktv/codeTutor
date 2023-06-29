const Faqs = require('../../models/Faqs.models.js')

const getFaqsById = async id => {
  const faqs = await Faqs.findById(id).populate({
    path: 'user'
  })
  return faqs
}

module.exports = getFaqsById
