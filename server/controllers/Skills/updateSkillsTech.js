const SkillsTech = require('../../models/SkillsTech.models.js')

const updateSkillsTech = async (
  id,
  { tutor, techName, years, description }
) => {
  const updatedSkillsTech = await SkillsTech.findByIdAndUpdate(
    id,
    { tutor, techName, years, description },
    { new: true }
  )

  const updatedSkillsTechPopulate = SkillsTech.findById(
    updatedSkillsTech._id
  ).populate({
    path: 'techName',
    name: 'name'
  })

  return updatedSkillsTechPopulate
}

module.exports = updateSkillsTech
