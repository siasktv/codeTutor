const Experience = require('../../models/Experience.models.js')

const updateExperience = async (
  id,
  { position, company, location, start_date, end_date, description, techName }
) => {
  const updatedExperience = Experience.findByIdAndUpdate(
    id,
    {
      position,
      company,
      location,
      start_date,
      end_date,
      description,
      techName,
    },
    { new: true }
  )
  return updatedExperience
}

module.exports = updateExperience
