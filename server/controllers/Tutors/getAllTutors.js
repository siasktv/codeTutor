const Tutor = require('../../models/Tutor.models')

const getAllTutors = async () => {
  const tutors = await Tutor.find()
    .populate({
      path: 'user',
    })
    .populate({
      path: 'skills',
      populate: {
        path: 'techName',
        select: 'name',
      },
    })
    .populate({
      path: 'experience',
      populate: {
        path: 'techName',
        select: 'name',
      },
    })
    .populate({
      path: 'projects',
      populate: {
        path: 'techName',
        select: 'name',
      },
    })
    .populate({
      path: 'reviews',
      populate: {
        path: 'rating',
        
      },
    });

  return tutors
}

module.exports = getAllTutors
