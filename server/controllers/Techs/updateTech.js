const Tech = require('../../models/Tech.models.js');

const updateTech = async (id, { name, category }) => {
  const updatedTech = await Tech.findByIdAndUpdate(
    id,
    { name, category },
    { new: true }
  );
  return updatedTech;
};

module.exports = updateTech;
