const SkillsTech = require('../../models/SkillsTech.models');

const deleteSkillsTech = async (id) => {
  const deletedSkillsTech = await SkillsTech.findByIdAndDelete(id);
  return deletedSkillsTech;
};

module.exports = deleteSkillsTech;