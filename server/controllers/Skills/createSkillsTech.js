const SkillsTech = require('../../models/SkillsTech.models')

const createSkillsTech = async ({ tutor, techName, years, description }) => {
  const newSkillsTech = await SkillsTech.create({
    tutor,
    techName,
    years,
    description
  })

  const newSkillsTechPopulate = newSkillsTech.populate({
    path: 'techName',
    name: 'name'
  })

  return newSkillsTechPopulate
}

module.exports = createSkillsTech
