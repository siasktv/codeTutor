const SkillsTech = require('../../models/SkillsTech.models.js');


const getSkillsTechById = async (id) => {
  const skillsTech = await SkillsTech.findById(id).populate({
    path: 'techName',
    select: 'name'
  });;
  return skillsTech;
};

module.exports = getSkillsTechById;
