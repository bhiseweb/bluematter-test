const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const JobSchema = new Schema({
  name: String
});
JobSchema.plugin(findOrCreate);
module.exports = mongoose.model('Jobs', JobSchema ,'Jobs');