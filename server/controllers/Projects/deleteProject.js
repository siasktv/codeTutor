const Project = require('../../models/Project.models.js')

const deleteProject = async id => {
  const deletedProject = await Project.findByIdAndDelete(id)
  return deletedProject
}

module.exports = deleteProject
