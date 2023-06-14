const Location = require('../../models/Location.models');

const getAllLocation = async () => {
  const allLocation = await Location.find();
  return allLocation;
};

module.exports = getAllLocation;
