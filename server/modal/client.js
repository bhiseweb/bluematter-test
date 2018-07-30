const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClientSchema = new Schema({
  description: String,
  industry: String,
  skills: String 
});

module.exports = mongoose.model('Clients', ClientSchema ,'clients');
