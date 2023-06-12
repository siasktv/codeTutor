const Tech = require('../../models/Tech.models.js');

const deleteTech = async (id) => {
  const deletedTech = await Tech.findByIdAndDelete(id);
  return deletedTech;
};

module.exports = deleteTech;