const SkillsTech = require('../../models/SkillsTech.models.js');

const deleteSkillsTech = async (id) => {
  const deletedSkillsTech = await SkillsTech.findByIdAndDelete(id);
  return deletedSkillsTech;
};

module.exports = deleteSkillsTech;