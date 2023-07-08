const Tutor = require('../../models/Tutor.models.js')

const updateTutor = async (
  id,
  {
    user,
    bio,
    languages,
    skills,
    experience,
    projects,
    reviews,
    rates,
    bankAccount,
    status,
    socialMedia,
    offline,
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
      reviews,
      rates,
      bankAccount,
      status,
      socialMedia,
      offline,
    },
    { new: true }
  )

  const tutorPopulate = await Tutor.findById(tutor._id)
    .populate({
      path: 'user',
    })
    .populate({
      path: 'skills',
      populate: {
        path: 'techName',
        select: 'name',
      },
    })
    .populate({
      path: 'experience',
      populate: {
        path: 'techName',
        select: 'name',
      },
    })
    .populate({
      path: 'projects',
      populate: {
        path: 'techName',
        select: 'name',
      },
    })
    .populate({
      path: 'reviews',
      // populate: {
      //   path: 'rating',
      // },
    })

  return tutorPopulate
}

module.exports = updateTutor
