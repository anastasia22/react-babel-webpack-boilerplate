import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import session from 'client-sessions'
import http from 'http'
import { match, RouterContext } from 'react-router'
import socket from 'socket.io'
import db from './db'
import routes from './router'
import config from './config'

let app = express();
let server = http.Server(app);
let io = socket(server);
let dbModels = db();

app.use(express.static(__dirname + '/static/'));
app.set('views', path.join(__dirname, '/views/'));
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'hjs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  cookieName: 'sessionSlack',
  secret: 'olaola',
  duration: 30 * 60 * 1000,
  activeDuration: 30 * 60 * 1000
}));

app.get('/conversations', (req, res) => {
  let conversations = [];

  dbModels.Conversation.find({owner: {_id : req.query['_id']}}, {
    companion: 1,
    _id: 1
  }, (err, conversations) => {

    dbModels.Conversation.find({companion: {_id : req.query['_id']}}, {
      owner: 1,
      _id: 1
    }, (err, conversations) => {
      res.send(JSON.stringify(conversations));
    });
  });

})

app.get('/search', (req, res) => {
  let regexp;
  let searchkey;
  for (searchkey in req.query) {
    regexp = new RegExp('^' + req.query[searchkey] + '\w' + '{0,}' , 'i');
  }
  dbModels.User.find({firstName: {$regex : regexp}}, {
    firstName: 1,
    lastName: 1,
    email: 1,
    _id: 1
  }, (err, users) => {
    if (users.length > 0) {
      res.status(200).send(JSON.stringify(users))
    } else {
      res.status(404).send('Not found');
    }
  });
})
app.post('/login', (req, res) => {
console.log('post login');
    dbModels.User.findOne({email: req.body.email}, {firstName: 1, email: 1, _id: 1}, (err, user) => {
      if (!user) {
        res.status(401).send('no such email address in db');
      } else {
        if (req.body.password === user.password) {
          req.sessionSlack.user = user;
          res.redirect('/cabinet');
        } else {
          res.status(401).send('wrong password');
        }
      }
    });
});
app.post('/register', (req, res) => {
  console.log('post register');
  dbModels.User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      var newUser = new dbModels.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });
      newUser.save((err) => {
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
app.post('/conversation', (req, res) => {
  console.log('post new conversation');
  let newConversation = new dbModels.Conversation({
    owner: req.body.owner,
    companion: req.body.companion,
    messages: [],
    newMessagesForOwner: false,
    newMessagesForCompanion: false
  });
  newConversation.save((err, conversation) => {
    if (err) {
      res.status(404).send('Not saved, error');
    } else {
      console.log('Conversation saved to db');
      res.send(JSON.stringify(conversation));
    }
  });
});

app.post('/message', (req, res) => {
  console.log('looking for user');
  dbModels.User.findOne({firstName: req.body.user}, (err, user) => {
    if (!user) {
      res.status(401).send('sorry, error occured');
    } else {
      response.writeHead(200, {"Content-Type": "application/json"});
      let foundedUser = JSON.stringify(user);
      response.end(foundedUser);
    }
  });
});

app.use(function(req, res) {
  console.log('entry point', req.url);

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error)
        console.log('ERROR!')
      else if (renderProps)
        config(req, res, renderProps, dbModels)
      else
        console.log(renderProps)
    })
})

//socket
io.on('connection', (socket) => {
  console.log('socket connected');
  socket.emit('new_connection', { hello: 'world' });
  socket.on('chat_message', (data) => {
    io.emit('chat_message', data);
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });
});

server.listen(app.get('port'), () => {
  console.log('Server is up and listening on port ' + server.address().port);
});
