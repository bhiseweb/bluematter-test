var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./config.js')
var app = express();
var port = process.env.PORT || 3008;

app.use(cors());
app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  console.log('Blumatter server start');
  next();
});

app.options('*', cors());
//cors handling
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();

});

//api use by user to call server
app.use('/api', require('./routes/client'));
app.use('/api', require('./routes/expert'));

app.listen(port);
console.log('Connected with port ' + port);

module.exports=app;