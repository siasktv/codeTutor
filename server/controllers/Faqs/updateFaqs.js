const Faqs = require('../../models/Faqs.models.js')

const updateFaqs = async (id, { user, question, sugessted }) => {
  const updatedFaqs = await Faqs.findByIdAndUpdate(
    id,
    { user, question, sugessted },
    { new: true }
  )

  const updatedFaqsPopulate = Faqs.findById(updatedFaqs._id).populate({
    path: 'user'
  })

  return updatedFaqsPopulate
}

module.exports = updateFaqs
