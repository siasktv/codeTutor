const Tutor = require('../../models/Tutor.models.js')

const deleteTutor = async id => {
  const tutor = await Tutor.findByIdAndDelete(id)
  return tutor
}

module.exports = deleteTutor
