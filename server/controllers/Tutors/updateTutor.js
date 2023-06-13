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

  const tutorPopulate = await tutor
    .populate({
      path: 'user'
    })
    .populate({
      path: 'skills',
      populate: {
        path: 'techName',
        select: 'name'
      }
    })
    .populate({
      path: 'experience',
      populate: {
        path: 'techName',
        select: 'name'
      }
    })
    .populate({
      path: 'projects',
      populate: {
        path: 'techName',
        select: 'name'
      }
    })

  return tutorPopulate
}

module.exports = updateTutor
