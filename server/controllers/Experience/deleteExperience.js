const Experience = require('../../models/Experience.models.js')

const deleteExperience = async (id) => {
  const deletedExperience = await Experience.findByIdAndDelete(id)
  return deletedExperience
}

module.exports = deleteExperience
