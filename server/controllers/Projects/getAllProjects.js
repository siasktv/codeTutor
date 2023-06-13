const Project = require('../../models/Project.models.js')

const getAllProjects = async () => {
  const allProjects = await Project.find().populate({
    path: 'techName',
    select: 'name'
  })
  return allProjects
}

module.exports = getAllProjects
