const Tutor = require('../../models/Tutor.models')

const getTutorById = async id => {
  const tutor = await Tutor.findById(id).populate(
    'user skills experience projects bankAccount'
  )

  return tutor
}

module.exports = getTutorById
