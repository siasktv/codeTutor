const mongoose = require('mongoose');
const Tech = require('../models/Tech.models');
const connectDB = require('../db');
  
  
  (async () => {
  connectDB();

  const newTech = await Tech.create({
    name: 'Redux',
    category: 'Web App',
  });

  console.log(newTech);
})();
