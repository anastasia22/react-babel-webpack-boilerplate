var express = require('express');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var db = mongoose.connection;

app.use(express.static(__dirname + '/static/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  cookieName: 'session',
  secret: 'srtjsryjkdtukdfylfyu;il',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

app.get('/', function (req, res) {
  console.log('trying to login', req);
  if (req.session && req.session.user) {
    User.findOne({email: req.sessiom.body.password}, function(err, user){
      if (!user) {
        //clear session data
        req.session.reset();
        res.redirect('/login');
      } else {
        res.locals.user = user;
        //success
      }
    });
  res.sendFile(__dirname + '/index.html');

  }
  else {
    res.redirect('/login')
  }


});

app.get('/login', function(req,res){
  res.sendFile(__dirname + '/index.html');
});
//checking if user entered correct password when logging
app.post('/login', function () {
    User.findOne({email: req.body.email}, function(err, user){
      if (!user) {
        console.log('no such email address')
      } else {
        if (req.body.password === user.password) {
          //begin to store session data
          req.session.user = user;
          res.redirect('/dashboard');
        } else {
          //wrond password or email
        }
      }
    });
});

app.post('/register', function (req, res) {
  console.log('registration', req.body.password);
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
      res.redirect('/dashboard');
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
server.listen(3333, function () {
  console.log('Server is listening on 3333 port');
});
