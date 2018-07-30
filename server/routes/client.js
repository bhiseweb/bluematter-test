var express = require('express');
var router = express.Router();
var Client = require('../modal/client');
var elastic = require('../elastic');

var experts_details;
//post client data
router.post('/client' ,function(req, res) {
  console.log('request......',req.body);
  var newClient = new Client();

  newClient.description = req.body.description;
  newClient.industry = req.body.industry;
  newClient.skills  = req.body.skills;

  newClient.save(function(err, data){
    if(err){
      res.send(err);
    }
    else{
      elastic.searchDocument(data).then(async function (result) { 
        console.log('normal searching ', result);
        result.hits.hits.map(r => {
          console.log(r._source) ;
        });
        await res.json(result.hits.hits);
      });
      elastic.filesSearch(data).then(function (result) { 
        console.log('files searching ', result);
        // res.json(result) 
      });
    }
  });
});

module.exports = router;