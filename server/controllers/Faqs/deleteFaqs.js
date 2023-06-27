const Faqs = require('../../models/Faqs.models.js');

const deleteFaqs = async (id) => {
  const deletedFaqs = await Faqs.findByIdAndDelete(id);
  return deletedFaqs;
}

module.exports = deleteFaqs;