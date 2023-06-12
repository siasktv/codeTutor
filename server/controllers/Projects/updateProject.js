const Project = require('../../models/Project.models.js')

const updateProject = async (
  id,
  { tutor, name, link, description, techName }
) => {
  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { tutor, name, link, description, techName },
    { new: true }
  )
  return updatedProject
}

module.exports = updateProject
