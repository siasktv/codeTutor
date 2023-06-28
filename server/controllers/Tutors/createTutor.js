const Tutor = require('../../models/Tutor.models.js')
const User = require('../../models/User.models.js')
const SkillsTech = require('../../models/SkillsTech.models.js')
const Experience = require('../../models/Experience.models.js')
const Project = require('../../models/Project.models.js')

const createTutor = async ({
  user,
  avatar,
  location,
  timezone,
  socialMedia,
  languages,
  bio,
  experience,
  skills,
  projects,
  rates,
  fullName,
  disponibility
}) => {
  const userUpdate = await User.findByIdAndUpdate(
    user,
    {
      image: avatar,
      location,
      timezone,
      fullName
    },
    { new: true }
  )

  const tutor = await Tutor.create({
    user: userUpdate._id,
    bio: {
      specialty: bio.specialty,
      description: bio.description,
      linkBriefcase: bio.portfolio
    },
    languages,
    socialMedia,
    rates: [
      {
        name: 'Mentorship',
        value: rates.hour,
        promo: rates.promo === 'true' || rates.promo === true ? true : false
      }
    ],
    status: 'pending',
    disponibility: [
      {
        day: 0,
        hours: disponibility.sunday
      },
      {
        day: 1,
        hours: disponibility.monday
      },
      {
        day: 2,
        hours: disponibility.tuesday
      },
      {
        day: 3,
        hours: disponibility.wednesday
      },
      {
        day: 4,
        hours: disponibility.thursday
      },
      {
        day: 5,
        hours: disponibility.friday
      },
      {
        day: 6,
        hours: disponibility.saturday
      }
    ]
  })

  // create skills, experience and projects and then push to tutor
  const skillsTech = await Promise.all(
    skills.map(async skill => {
      const newSkill = await SkillsTech.create({
        tutor: tutor._id,
        techName: skill.techName,
        years: skill.years,
        description: skill.description
      })
      return newSkill._id
    })
  )

  const experienceCreate = await Promise.all(
    experience.map(async exp => {
      const newExp = await Experience.create({
        tutor: tutor._id,
        position: exp.position,
        company: exp.company,
        location: exp.location,
        start_date: exp.startDate,
        end_date: exp.endDate,
        current:
          exp.currentlyWorking === 'true' || exp.currentlyWorking === true
            ? true
            : false,
        description: exp.description,
        techName: exp.techName
      })
      return newExp._id
    })
  )

  const projectsCreate = await Promise.all(
    projects.map(async project => {
      const newProject = await Project.create({
        tutor: tutor._id,
        name: project.name,
        description: project.description,
        link: project.link,
        techName: project.techName
      })
      return newProject._id
    })
  )

  const tutorUpdate = await Tutor.findByIdAndUpdate(
    tutor._id,
    {
      skills: skillsTech,
      experience: experienceCreate,
      projects: projectsCreate
    },
    { new: true }
  )

  const tutorPopulate = await Tutor.findById(tutor._id)
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
    .populate({
      path: 'reviews'
      // populate: {
      //   path: 'rating',
      // },
    })

  return tutorPopulate
}

module.exports = createTutor
