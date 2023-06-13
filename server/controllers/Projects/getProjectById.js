const Project = require('../../models/Project.models.js')

const getProjectById = async id => {
  const project = await Project.findById(id).populate({
    path: 'techName',
    select: 'name'
  })
  return project
}

module.exports = getProjectById
