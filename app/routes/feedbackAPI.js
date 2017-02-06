var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

// require DATA API FEEDBACK 
var feedbackData = require('../data/feedback.json');

// CREATE A GET route
router.get('/feedbackAPI', function (req, res) {

  // response from the DATA feedback file
  res.json(feedbackData);

});

// use Body Parser to get the details from the form
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// CREATE A POST route
router.post('/feedbackAPI', function(req, res){
 
  // put the new data at the beginning that's why "unshift"!
  feedbackData.unshift(req.body);
  
  // call fs to make sure the post data is kept and sent to DATA
  fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function (err) {
     if (err) {
      return res.sendStatus(404);
    }
  });
  
  res.json(feedbackData);
  
});

// CREATE A DELETE route
router.delete('/feedbackAPI/:id', function(req, res){
 
  // put the new data at the beginning that's why "unshift"!
  feedbackData.splice(req.params.id, 1);
  
  // call fs to make sure the post data is kept and sent to DATA
  fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function (err) {
    if (err) {
      return res.sendStatus(404);
    }
  });
  
  res.json(feedbackData);
  
});

module.exports = router;