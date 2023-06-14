const getAllLocation = require('../../controllers/Locations/getAllLocation')
const saveApiLocation = require('../../controllers/Locations/saveApiLocation')


const getAllLocationHandler = async (req, res) => {
  try {
    const allLocation = await getAllLocation();
        res.status(200).json(allLocation);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};

const saveApiLocationHandler = async (req, res) => {
  try {
    await saveApiLocation(req, res);
  } catch (error) {

      res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllLocationHandler,
  saveApiLocationHandler
}