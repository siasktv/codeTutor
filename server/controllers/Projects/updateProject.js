const Project = require('../../models/Project.models.js')

const updateProject = async (
  id,
  { tutor, name, link,end_date, description, techName }
) => {
  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { tutor, name, link,end_date, description, techName },
    { new: true }
  )

  const updatedProjectPopulate = await Project.findById(
    updatedProject._id
  ).populate({
    path: 'techName',
    select: 'name'
  })
  return updatedProjectPopulate
}

module.exports = updateProject
