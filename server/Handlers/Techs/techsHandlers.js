const createTech = require('../../controllers/Techs/createTech.js')
const getTechById = require('../../controllers/Techs/getTechById.js')
const getAllTech = require('../../controllers/Techs/getAllTech.js')
const deleteTech = require('../../controllers/Techs/deleteTech.js')
const updateTech = require('../../controllers/Techs/updateTech.js')


const getAllTechHandler = async (req, res) => {
  try {
    const allTech = await getAllTech();
    res.status(200).json(allTech);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTechByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const tech = await getTechById(id);
    res.status(200).json(tech);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTechHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTech = await deleteTech(id);
    res.status(200).json(deletedTech);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTechHandler = async (req, res) => {
  const { name, category  } = req.body;
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  if (!category || category.length === 0) {
    return res.status(400).json({ error: 'Category is required' });
  }

  const validCategories = [
    'Web App',
    'Mobile App',
    'Lenguajes',
    'Ciencia de Datos',
    'Base de Datos',
  ];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid Category' });
  }


  try {
    const newTech = await createTech({
      name,
      category,
    });
    res.status(200).json(newTech);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTechHandler = async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!category || category.length === 0) {
    return res.status(400).json({ error: 'Category is required' });
  }
  
  const validCategories = [
    'Web App',
    'Mobile App',
    'Lenguajes',
    'Ciencia de Datos',
    'Base de Datos',
  ];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid Category' });
  }


  try {
    const updatedTech = await updateTech(id, {
      name,
      category,
    });
    res.status(200).json(updatedTech);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  getAllTechHandler,
  getTechByIdHandler,
  deleteTechHandler,
  createTechHandler,
  updateTechHandler,
};