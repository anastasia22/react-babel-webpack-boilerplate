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
var dbModels = require('./db.js')();

app.use(express.static(__dirname + '/static/'));
app.set('views', path.join(__dirname, '/views/'));
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'hjs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/login', require('./routers/login'));
app.use('/register', require('./routers/register'));

app.use(session({
  cookieName: 'sessionSlack',
  secret: 'olaola',
  duration: 1 * 60 * 1000,
  activeDuration: 1 * 60 * 1000
}));

app.get('/cabinet', function handleRequest (req, res) {
if (req.sessionSlack && req.sessionSlack.user) {
  console.log('name of user', req.sessionSlack.user.name);

}
if (req.sessionSlack && req.sessionSlack.user) {
  console.log('user in session found');
  dbModels.User.findOne({email: req.sessionSlack.user.email}, function(err, user){
    if (!user) {
      console.log('wrond user data');
      req.sessionSlack.reset();
      res.redirect('/login');
    } else {
      res.locals.user = user;
      console.log('we know such user!!!');
      res.render('layout', {
        header: res.locals.user.firstName + res.locals.user.lastName,
        content: "This is your cabinet <a href='/logout'>Logout</a> to quit"
      });
    }
  });
}
else {
  req.sessionSlack.reset();
  console.log('no session, redirected to login');
  res.redirect('/login');
}});

app.get('/logout', function(req, res) {
  console.log('get logout');
  req.sessionSlack.reset();
  res.redirect('/login');
});

app.post('/login', function (req, res) {
console.log('post login');
    dbModels.User.findOne({email: req.body.email}, function(err, user){
      if (!user) {
        console.log('no such email address in db');
        res.status(401).send('no such email address in db');
      } else {
        if (req.body.password === user.password) {
          console.log('begin to store session data, redirect to cabinet');
          req.sessionSlack.user = user;
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
  dbModels.User.findOne({email: req.body.email}, function(err, user){
    if (!user) {
      var newUser = new dbModels.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(function(err) {
        if (err) {
          console.log('Error when saving user')
        } else {
          console.log('User saved to db, stored name');
          req.sessionSlack.user = user;
          res.redirect('/cabinet');
        }
      });
    } else {
      res.status(401).send('user already is registered');
    }
  });

});

app.use(require('./routers/404'));


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

server.listen(app.get('port'), function () {
  console.log('Server is up and listening on port ' + server.address().port);
});
