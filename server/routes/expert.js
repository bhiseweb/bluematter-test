var express = require('express');
var router = express.Router();
var Expert = require('../modal/expert');
var elastic = require('../elastic');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage }).single('file');
//post expert data
router.post('/expert', function(req, res) {
  upload(req, res, function(err) {
    var newExpert = new Expert();
    newExpert.description = req.body.description;
    newExpert.industry = req.body.industry;
    newExpert.skills  = req.body.skills.split(",");
    newExpert.name = req.body.name;
    newExpert.email  = req.body.email;
    if(req.file)
      newExpert.resume = req.file.filename;

    newExpert.save(function(err, data){
      if(err){
        res.send(err);
      }
      else{
        if(req.file) { 
          elastic.filesIndexExists().then(function (exists) {  
            if (exists) {
              return elastic.deleteFileIndex();
            }
          }).then(function () {
            elastic.filesCreate().then(function () {
              elastic.filesAdd(req.file).then(function (result) {
                console.log('files data indexing ', result);
                res.json(result);
              })
            })
          });
        }
        //normal data mapping
        elastic.indexExists().then(function (exists) {  
          if (exists) {
            return elastic.deleteIndex();
          }
        }).then(function () {
          elastic.initIndex().then(elastic.initMapping).then(async function () {
            const allData = await Expert.find();
            allData.map(expert => {
              elastic.addDocument(expert).then(function () { 
                console.log('normal data indexing ');
              });
            });
            res.json(allData);
          });
        }); 
      }
    });
  });
});


module.exports = router;