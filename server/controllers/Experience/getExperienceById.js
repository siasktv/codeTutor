const Experience = require('../../models/Experience.models.js')

const getExperienceById = async (id) => {
  const experience = await Experience.findById(id).populate({
    path: 'techName',
    select: 'name',
  })
  return experience
}

module.exports = getExperienceById
