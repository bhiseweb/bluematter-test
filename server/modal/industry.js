const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const IndustrySchema = new Schema({
  name: String
});
IndustrySchema.plugin(findOrCreate);
module.exports = mongoose.model('Industry', IndustrySchema ,'Industry');