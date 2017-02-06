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

  /*
  dataFile.events.forEach(function (item) {
    info += '<li><h2>' + item.title + '</h2><img src="/images/' + item.shortname + '.jpeg" alt="event" style="height: 300px;"><p>' + item.summary + '</p></li>';
  });

  res.send('<link rel="stylesheet" type="text/css" href="/css/style.css"><h1>Runners Meetups</h1>' + info);
*/
});

// go to SINGLE event path
router.get('/events/:eventsid', function (req, res) {

  // grab appData info created in app.js
  var dataFile = req.app.get('appData');
  var events = dataFile.events[req.params.eventsid];
  res.send('<link rel="stylesheet" type="text/css" href="/css/style.css"><h1>' + events.title + '</h1><img src="/images/' + events.shortname + '.jpeg" alt="event" style="height: 300px;"><p>' + events.summary + '</p>');

});

module.exports = router;
