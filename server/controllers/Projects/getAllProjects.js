const Project = require('../../models/Project.models.js')

const getAllProjects = async () => {
  const allProjects = await Project.find()
  return allProjects
}

module.exports = getAllProjects
