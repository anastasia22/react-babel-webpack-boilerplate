var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var db = mongoose.connection;

app.use(express.static(__dirname + '/app/'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + 'index.html');
});

//database
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')
});

var chatRoomSchema = mongoose.Schema({
    name: String,
    participants: Array
});
var ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

server.listen(3333, function () {
  console.log('Server is listening on 3333 port');
});
mongoose.connect('mongodb://localhost/dbname');

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
