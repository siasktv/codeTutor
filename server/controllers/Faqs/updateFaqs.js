const Faqs = require('../../models/Faqs.models.js');

const updateFaqs = async (id, { user, question, answer }) => {
  const updatedFaqs = await Faqs.findByIdAndUpdate(
    id,
    { user, question, answer },
    { new: true }
  );

  const updatedFaqsPopulate = Faqs.findById(updatedFaqs._id).populate({
    path: 'user',
    select: 'name',
  });

  return updatedFaqsPopulate;
};

module.exports = updateFaqs;