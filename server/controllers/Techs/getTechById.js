const Tech = require('../../models/Tech.models.js');


const getTechById = async (id) => {
  const tech = await Tech.findById(id);
  return tech;
};

module.exports = getTechById;
