var express = require('express');
var router = express.Router();

// go to main root path
router.get('/chat', function (req, res) {

  // reference to index.ejs which is the view point  
  res.render('chat');

});

module.exports = router;