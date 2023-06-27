const faqs = require('../../models/Faqs.models.js');

const createFaqs = async ({ user, question, answer }) => {
  const newFaqs = await faqs.create({ user, question, answer })

  const newFaqsPopulate = faqs.findById(newFaqs._id).populate(
    {
      path: 'user',
      name: 'name'
    }
  )

  return newFaqsPopulate
}

module.exports = createFaqs