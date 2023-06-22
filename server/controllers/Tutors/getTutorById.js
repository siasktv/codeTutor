const Tutor = require('../../models/Tutor.models')

const getTutorById = async (id) => {
  const tutor = await Tutor.findById(id)
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

  return tutor
}

module.exports = getTutorById
