const Experience = require('../../models/Experience.models.js')

const getExperienceByTutorId = async id => {
  const experience = await Experience.find({ tutor: id }).populate({
    path: 'techName',
    select: 'name'
  })
  return experience
}

module.exports = getExperienceByTutorId
