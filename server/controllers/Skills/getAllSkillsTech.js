const SkillsTech = require('../../models/SkillsTech.models.js');


const getAllSkillsTech = async () => {
  const allSkillsTech = await SkillsTech.find().populate({
    path: 'techName',
    select: 'name'
  });
  return allSkillsTech;
};

module.exports = getAllSkillsTech;