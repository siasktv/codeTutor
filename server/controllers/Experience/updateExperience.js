const Experience = require('../../models/Experience.models.js')

const updateExperience = async (
  id,
  {
    position,
    company,
    location,
    start_date,
    end_date,
    description,
    techName,
    current
  }
) => {
  const updatedExperience = await Experience.findByIdAndUpdate(
    id,
    {
      position,
      company,
      location,
      start_date,
      end_date,
      description,
      techName,
      current
    },
    { new: true }
  )

  const updatedExperiencePopulate = await Experience.findById(
    updatedExperience._id
  ).populate({
    path: 'techName',
    select: 'name'
  })

  return updatedExperiencePopulate
}

module.exports = updateExperience
