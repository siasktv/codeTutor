const Tech = require('../../models/Tech.models.js');


const getAllTech = async () => {
  const allTech = await Tech.find();
  return allTech;
};

module.exports = getAllTech;