const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: String,
  email: String,
  bio: String,
  description: String,
  industry: String,
  skills: [String]
});

module.exports = mongoose.model('Clients', ClientSchema ,'clients');
