const Faqs = require('../../models/Faqs.models.js');

const getFaqsById = async (id) => {
  const faqs = await Faqs.findById(id).populate({
    path: 'user',
    select: 'name'
  });
  return faqs;
}

module.exports = getFaqsById;