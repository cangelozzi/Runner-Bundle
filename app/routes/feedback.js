var express = require('express');
var router = express.Router();

// go to main root path
router.get('/feedback', function (req, res) {

  // reference to index.ejs which is the view point  
  res.render('feedback');

});

module.exports = router;