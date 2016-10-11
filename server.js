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


console.log(process.env.PORT);
app.use(express.static(__dirname + '/static/'));
app.set('views', path.join(__dirname, '/views/'));
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'hjs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', router);

// app.use(session({
//   cookieName: 'session',
//   secret: 'srtjsryjkdtukdfylfyu;il',
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000
// }));

// function handleRequest (req, res) {
  // console.log('trying to login', 'req session:' + !!req.session, 'req user' + !!req.session.user);
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
  // res.sendFile(__dirname + '/index.html');
  // }
  // else {
  //   req.session.reset();
  //   console.log('req sess' + req.session);
  //   res.redirect('/login');
  // }


// }
// app.get('/', handleRequest);
// app.get('/register', function(req,res){
//   res.sendFile(__dirname + '/index.html');
// });
// //
// app.get('/login', function(req,res){
//   res.sendFile(__dirname + '/index.html');
// });
// //checking if user entered correct password when logging
// app.post('/login', function () {
//     User.findOne({email: req.body.email}, function(err, user){
//       if (!user) {
//         console.log('no such email address')
//       } else {
//         if (req.body.password === user.password) {
//           //begin to store session data
//           req.session.user = user;
//           res.redirect('/dashboard');
//         } else {
//           //wrond password or email
//         }
//       }
//     });
// });
//
// app.post('/register', function (req, res) {
//   console.log('registration');
//   var user = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password
//   });
//   user.save(function(err) {
//     if (err) {
//       console.log('Error when saving user')
//     } else {
//       console.log('User saved to db');
//       res.redirect('/dashboard');
//     }
//   })
// });
//
// //database
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('db connected')
// });
//
// var Schema = mongoose.Schema,
//   ObjectId = Schema.ObjectId;
//
// var chatRoomSchema = new Schema({
//     name: String,
//     participants: Array
// });
// var userSchema = new Schema({
//   id: ObjectId,
//   firstName: String,
//   lastName: String,
//   password: String,
//   email: {type: String, unique: true}
// });
// var ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
// var User = mongoose.model('User', userSchema);
//
//
//
// //socket
// io.on('connection', function (socket) {
//   console.log('socket connected');
//   socket.emit('new_connection', { hello: 'world' });
//   socket.on('chat_message', function (data) {
//     io.emit('chat_message', data);
//   });
//   socket.on('disconnect', function () {
//     console.log('socket disconnected');
//   });
// });
//
// mongoose.connect('mongodb://localhost/slackdb');
server.listen(app.get('port'), function () {
  console.log('Server is up and listening on port ' + server.address().port);
});
