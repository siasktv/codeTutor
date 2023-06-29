const faqs = require('../../models/Faqs.models.js')

const createFaqs = async ({ user, question, sugessted }) => {
  const newFaqs = await faqs.create({ user, question, sugessted })

  const newFaqsPopulate = faqs.findById(newFaqs._id).populate({
    path: 'user'
  })

  return newFaqsPopulate
}

module.exports = createFaqs
