const Experience = require('../../models/Experience.models.js')

const getAllExperiences = async () => {
  const allExperiences = await Experience.find().populate({
    path: 'techName',
    select: 'name'
  })

  console.log(allExperiences)

  return allExperiences
}

module.exports = getAllExperiences
