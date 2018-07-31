var express = require('express');
var router = express.Router();
var Client = require('../modal/client');
var elastic = require('../elastic');


//post client data for search
router.post('/search/:id' ,function(req, res) {
  console.log('request......',req.body, req.params);
  Client.findOne({ _id: req.params.id }, function(err, data){
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

//post client data
router.post('/client' ,function(req, res) {
  console.log('request......',req.body);
  var newClient = new Client();

  newClient.name = req.body.name;
  newClient.email = req.body.email;
  newClient.bio = req.body.bio;
  newClient.description = req.body.description;
  newClient.industry = req.body.industry;
  newClient.skills  = req.body.skills;

  newClient.save(function(err, data){
    if(err){
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//get  clients data
router.get('/clients_details' ,async function(req, res) {
  const clients = await Client.find();
  res.send(clients);
});

module.exports = router;