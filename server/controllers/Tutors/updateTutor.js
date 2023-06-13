const Tutor = require('../../models/Tutor.models')

const updateTutor = async (
  id,
  {
    user,
    bio,
    languages,
    skills,
    experience,
    projects,
    rates,
    bankAccount,
    status,
    socialMedia,
    offline
  }
) => {
  const tutor = await Tutor.findByIdAndUpdate(
    id,
    {
      user,
      bio,
      languages,
      skills,
      experience,
      projects,
      rates,
      bankAccount,
      status,
      socialMedia,
      offline
    },
    { new: true }
  )

  const tutorPopulate = await tutor.populate(
    'user skills experience projects bankAccount'
  )

  return tutorPopulate
}

module.exports = updateTutor
