var express = require('express');
var app = express();
var dataFile = require('./data/data.json');
var io = require('socket.io')();

app.set('port', process.env.PORT || 8080 );

// create a variable and send the data to the whole app
app.set('appData', dataFile);

// set view engine
app.set('view engine', 'ejs');
// specify the path of the VIEWS folder ./app/views
// to have routes(endpoints) access to the views
app.set('views', 'app/views');

// go to mock data
app.locals.allEvents = dataFile.events;

// access STATIC (public) folder with all docs and file
// available throughout the whole app
app.use(express.static('app/public'));

app.use(require('./routes/index'));
app.use(require('./routes/events'));
app.use(require('./routes/feedback'));
app.use(require('./routes/feedbackAPI'));
app.use(require('./routes/chat'));

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

// attach socket to the server
io.attach(server);

var userConnected = 0;
// connect Socket 
io.on('connection', function(socket) {
  
  // for TEST with Mocha/Chai purposes ONLY
  socket.on('connection name',function(user){
    io.sockets.emit('new user', user.name + " has joined.");
  })
 // ---------------------------------------------------------
  
  
  console.log('Socket.IO - Welcome! - User Connected')
   userConnected++
   console.log('connections: ' + userConnected)
  
   // "postMessage" detect the message
  socket.on('postMessage', function(data){
    io.emit('updateMessage', data);
  });
  
  socket.on('disconnect', function() {
    console.log('Socket.IO - Goodbye! - User Disconnected')
    userConnected--
    io.emit('user disconnected');
    console.log('connections: ' + userConnected)
  })
});

exports.app = app;

