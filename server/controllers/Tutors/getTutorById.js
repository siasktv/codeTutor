const Tutor = require('../../models/Tutor.models.js')
const Session = require('../../models/Session.models.js')

const getTutorById = async id => {
  const tutor = await Tutor.findById(id)
    .populate({
      path: 'user'
    })
    .populate({
      path: 'skills',
      populate: {
        path: 'techName',
        select: 'name'
      }
    })
    .populate({
      path: 'experience',
      populate: {
        path: 'techName',
        select: 'name'
      }
    })
    .populate({
      path: 'projects',
      populate: {
        path: 'techName',
        select: 'name'
      }
    })
    .populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'fullName image'
      }
    })

  const sessions = await Session.find({ tutorUserId: tutor.user._id })
    .populate('tutorUserId')
    .populate('clientUserId')

  return {
    ...tutor._doc,
    sessions
  }
}

module.exports = getTutorById
