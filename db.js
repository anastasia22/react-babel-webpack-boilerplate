export default function() {
  var mongoose = require('mongoose');
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('db connected')
  });

  var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

  var userSchema = new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    password: String,
    email: {type: String, unique: true}
  });
  var messageSchema = new Schema({
    time : { type : Date, default: Date.now },
    id: ObjectId,
    stamp: Number,
    sender: String,
    recipient: String,
    body: String,
    delivered: Boolean,
    seen: Boolean
  });
  var conversationSchema = new Schema({
    owner: userSchema,
    id: ObjectId,
    companion: userSchema,
    messages: [messageSchema],
    newMessagesForOwner: Boolean,
    newMessagesForCompanion: Boolean
  });

  conversationSchema.methods.retrieveFrom = function(index, quantity) {
    return this.$where('this.id > ' + index + ' && this.id < ' + quantity);
  };

  var Conversation = mongoose.model('Conversation', conversationSchema);
  var User = mongoose.model('User', userSchema);
  var Message = mongoose.model('Message', messageSchema);

  mongoose.connect('mongodb://localhost/slackdb');

  return {
    Message: Message,
    User: User,
    Conversation: Conversation
  }

}
