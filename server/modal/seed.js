var Job =  require('./jobs');
var Industry =  require('./industry');
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require("mongoose");
var jobs = require('../jobs.json');
var industries = require('../industry.json');

export default (config) => {
  console.log("----------------------------------Seed in progress---------------------------------");


  // Drop database and add new data
  return mongoose.connection.dropDatabase()
    .then(createJobs)
    .then(createIndustry)
}

function createJobs() {
  console.log("createJobs");
  jobs.map(job => {
    return Job.findOrCreate({name: job});
  })
  .then((incubators) => {
      return {
        incubators
      };
    
},

function createIndustry() {
  console.log("createIndustry");
  industries.map(industry => {
    return Industry.findOrCreate({name: job});
  })
  .then((incubators) => {
      return {
        incubators
      };
    
}