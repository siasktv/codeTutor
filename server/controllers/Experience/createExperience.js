const Experience = require('../../models/Experience.models.js')
const Tutors = require('../../models/Tutor.models.js');

const createExperience = async ({
  tutor,
  position,
  company,
  location,
  start_date,
  end_date,
  current,
  description,
  techName
}) => {
  const newExperience = await Experience.create({
    tutor,
    position,
    company,
    location,
    start_date,
    end_date,
    current,
    description,
    techName
  })
  
  const result = await Tutors.findOneAndUpdate(
    { _id: tutor },
    { $push: { experience: newExperience._id } }
  );
  console.log('result', result);

  

  const newExperiencePopulate = Experience.findById(newExperience._id).populate(
    {
      path: 'techName',
      select: 'name'
    }  
  )  


  return newExperiencePopulate
}

module.exports = createExperience
