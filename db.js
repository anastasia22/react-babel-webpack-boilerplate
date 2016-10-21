module.exports = function() {
  var mongoose = require('mongoose');
  var db = mongoose.connection;

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

  mongoose.connect('mongodb://localhost/slackdb');

  return {
    ChatRoom: ChatRoom,
    User: User
  }

};
