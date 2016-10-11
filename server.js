require('babel-register')({
    presets: ['es2015', 'react']
});

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('client-sessions');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var db = mongoose.connection;
router = require('./routers');

app.use(express.static(__dirname + '/static/'));
app.set('views', path.join(__dirname, '/views/'));
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'hjs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', router);

app.use(session({
  cookieName: 'session',
  secret: 'olaola',
  duration: 1 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

  // function handleRequest (req, res) {
  // if (req.session && req.session.user) {
  //   User.findOne({email: req.sessiom.body.password}, function(err, user){
  //     if (!user) {
  //       //clear session data
  //       req.session.reset();
  //       res.redirect('/login');
  //     } else {
  //       res.locals.user = user;
  //       //success
  //     }
  //   });
  // }
  // else {
  //   req.session.reset();
  //   console.log('req sess' + req.session);
  //   res.redirect('/login');
  // }

app.post('/login', function (req, res) {
console.log('post login');
    User.findOne({email: req.body.email}, function(err, user){
      if (!user) {
        console.log('no such email address in db');
        res.status(401).send('no such email address in db');
      } else {
        if (req.body.password === user.password) {
          console.log('begin to store session data, redirect to cabinet');
          req.session.user = user;
          res.redirect('/cabinet');
        } else {
          console.log('wrond password');
          res.status(401).send('wrong password');
        }
      }
    });
});

app.post('/register', function (req, res) {
  console.log('post register');
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err) {
    if (err) {
      console.log('Error when saving user')
    } else {
      console.log('User saved to db');
      res.redirect('/cabinet');
    }
  })
});

//database
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')
});

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var chatRoomSchema = new Schema({
    name: String,
    participants: Array
});
var userSchema = new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  password: String,
  email: {type: String, unique: true}
});
var ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
var User = mongoose.model('User', userSchema);



//socket
io.on('connection', function (socket) {
  console.log('socket connected');
  socket.emit('new_connection', { hello: 'world' });
  socket.on('chat_message', function (data) {
    io.emit('chat_message', data);
  });
  socket.on('disconnect', function () {
    console.log('socket disconnected');
  });
});

mongoose.connect('mongodb://localhost/slackdb');

server.listen(app.get('port'), function () {
  console.log('Server is up and listening on port ' + server.address().port);
});
