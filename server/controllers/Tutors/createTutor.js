const Tutor = require('../../models/Tutor.models')

const createTutor = async ({
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
}) => {
  const tutor = await Tutor.create({
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
  })

  const tutorPopulate = await tutor.populate(
    'user skills experience projects bankAccount'
  )

  return tutorPopulate
}

module.exports = createTutor
