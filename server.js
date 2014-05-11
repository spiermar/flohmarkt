var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());

var mongoose = require('mongoose');
var uri = String(process.env.MONGODB_URI);
db = mongoose.connect(uri),
Schema = mongoose.Schema;

// User schema
var UserSchema = new Schema({
  name: String,
  email: String
});

// Use the schema to register a model with MongoDb
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

// Item schema
var ItemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  likes: [UserSchema]
});

// Use the schema to register a model with MongoDb
mongoose.model('Item', ItemSchema); 
var Item = mongoose.model('Item');

// This function is responsible for returning all entries for the Item model
function getItem(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  Item.find().sort('likes').exec(function (err, data) {
    res.send(data);
  });
}

function postItem(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new Item model, fill it up and save it to Mongodb
  var item = new Item();
  item.name = req.params.name;
  item.description = req.params.description;
  item.price = req.params.price;
  item.likes = [];
  item.save(function() {
    res.send(req.body);
  });
}

function postLike(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  Item.findOne({ '_id': req.params.id }, function (err, item) {
  	item.likes.push({ name: req.params.name, email: req.params.email });
  	item.save(function() {
      res.send(item);
  	});
  });
}

// Set up our routes and start the server
server.get('/item', getItem);
server.post('/item', postItem);
server.post('/item/:id/like', postLike);

server.get(/.*/, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
