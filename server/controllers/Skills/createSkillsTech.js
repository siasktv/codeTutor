const SkillsTech = require('../../models/SkillsTech.models')
const Tutors = require('../../models/Tutor.models.js');

const createSkillsTech = async ({ tutor, techName, years, description }) => {
  const newSkillsTech = await SkillsTech.create({
    tutor,
    techName,
    years,
    description
  })

  const result = await Tutors.findOneAndUpdate(
    { _id: tutor },
    { $push: { skills: newSkillsTech._id } }
    );
    
    console.log('result', result);
    
    const newSkillsTechPopulate = SkillsTech.findById(newSkillsTech._id).populate(
      {
        path: 'techName',
        name: 'name'
      }
    )
  return newSkillsTechPopulate
}

module.exports = createSkillsTech
