const Tutor = require('../../models/Tutor.models.js')

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
        path: 'user',
        select: 'fullName image',
      },
    })

  return tutors
}

module.exports = getAllTutors
