const Tutor = require('../../models/Tutor.models')

const createTutor = async ({
  user,
  bio,
  languages,
  skills,
  experience,
  projects,
  // reviews,
  rates,
  bankAccount,
  status,
  socialMedia,
  offline
}) => {
  const tutor = await Tutor.create({
    user,
    bio,
    languages,
    skills,
    experience,
    projects,
    // reviews,
    rates,
    bankAccount,
    status,
    socialMedia,
    offline
  })

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
    });

  return tutorPopulate
}

module.exports = createTutor
