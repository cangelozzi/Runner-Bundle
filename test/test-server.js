var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app/app.js');
var io = require('socket.io')(app);

var should = chai.should();
var expect = chai.expect;
var app = server.app;

chai.use(chaiHttp);

describe('node_capstone', function () {
  it('should list items on GET /events', function (done) {
    chai.request(app)
      .get('/events')
      .end(function (err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });


  it('should list items on GET /feedbackAPI', function (done) {
    chai.request(app)
      .get('/feedbackAPI')
      .end(function (err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('event');
        res.body[0].should.have.property('message');
        res.body[0].name.should.be.a('string');
        done();
      });
  });

  it('should add an item on POST /feedbackAPI', function (done) {
    chai.request(app)
      .post('/feedbackAPI')
      .send({
        'name': 'You',
        'event': 'Test',
        'message': 'Hello'
      })
      .end(function (err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        expect(res.body[0]).to.exist;
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('event');
        res.body[0].should.have.property('message');     
        res.body[0].name.should.be.a('string');
        
        done();
      });
  });



  it('should delete an item on DELETE /feedbackAPI', function (done) {
    chai.request(app)
      .delete('/feedbackAPI/0')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.be.a('object');
        expect({}).to.be.empty;
        done();
      });
  });

  it('should test /chat', function (done) {
    chai.request(app)
      .get('/chat')
      .end(function (err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

});


var io = require('socket.io-client');
var socketURL = 'http://127.0.0.1:8080';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

var chatUser1 = {
  'name': 'Tom'
};
var chatUser2 = {
  'name': 'Sally'
};
var chatUser3 = {
  'name': 'Dana'
};

describe("SOCKET.IO - Chat Server", function () {
  it('SOCKET.IO - Chat Server should broadcast new user to all users', function (done) {


    var client1 = io.connect(socketURL, options);

    client1.on('connect', function (data) {
      client1.emit('connection name', chatUser1);

      /* Since first client is connected, we connect
      the second client. */
      var client2 = io.connect(socketURL, options);

      client2.on('connect', function (data) {
        client2.emit('connection name', chatUser2);
      });

      client2.on('new user', function (usersName) {
        usersName.should.equal(chatUser2.name + " has joined.");
        client2.disconnect();
      });

    });

    var numUsers = 0;
    client1.on('new user', function (usersName) {
      numUsers += 1;

      if (numUsers === 2) {
        usersName.should.equal(chatUser2.name + " has joined.");
        client1.disconnect();
        done();
      }
    });
  });
});