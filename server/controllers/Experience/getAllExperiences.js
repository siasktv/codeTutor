const Experience = require('../../models/Experience.models.js')

const getAllExperiences = async (id) => {
  const allExperiences = await Experience.find({ tutor: id }).populate({
    path: 'techName',
    select: 'name',
  })

  console.log(allExperiences)

  return allExperiences
}

module.exports = getAllExperiences
