var mongo = require("mongoose");
var db =  mongo.connect("mongodb://127.0.0.1:27017/blumatter",
  function(err, response){
    if(err){ console.log('Failed to connect'); }
    else{ console.log('Connected with database!!!'); }
  }
);

module.exports = db;

