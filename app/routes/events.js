var express = require('express');
var router = express.Router();



// go to ALL events path
router.get('/events', function (req, res) {
  var info = '';

  // grab appData info created in app.js
  var dataFile = req.app.get('appData');

  res.render('events', {
    pageID: 'events',
    events: dataFile.events
  });
});

// go to SINGLE event path
router.get('/events/:eventsid', function (req, res) {
  
  var data = req.app.get('appData');
  var pageEvents = [];

  data.events.forEach(function(item) {
    if (item.shortname == req.params.eventsid) {
      pageEvents.push(item);
    }
});
  
  res.render('singleEvent', {
    pageID: 'events',
    events: pageEvents
  });
});

module.exports = router;