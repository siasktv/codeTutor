const Tutor = require('../../models/Tutor.models')

const getAllTutors = async () => {
  const tutors = await Tutor.find().populate(
    'user skills experience projects bankAccount'
  )

  return tutors
}

module.exports = getAllTutors
