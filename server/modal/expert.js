const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ExpertSchema = new Schema({
  name: String,
  email: String,
  description: String,
  industry: String,
  skills: String,
});

module.exports = mongoose.model('Experts', ExpertSchema ,'experts');
