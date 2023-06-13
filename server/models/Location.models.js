const { Schema, model } = require('mongoose');

const LocationSchema = new Schema({
  id: String,
  name: String,
  timezones: String,
},{
timestamps: true,
});

module.exports= model('Location', LocationSchema)