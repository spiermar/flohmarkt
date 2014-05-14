/*jslint node: true */
/*jshint es5: true */
/*global angular*/

'use strict';

var restify = require('restify');
var mongoose = require('mongoose');
var uri = String(process.env.MONGODB_URI);

var server = restify.createServer({
    name: 'flohmarkt',
    version: '1.0.0'
});
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

mongoose.connect(uri);
var Schema = mongoose.Schema;

// User schema
var userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: String
});

// Use the schema to register a model with MongoDb
var User = mongoose.model('User', userSchema);

// Session schema
var sessionSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

// Use the schema to register a model with MongoDb
var Session = mongoose.model('Session', sessionSchema);

// Item schema
var itemSchema = new Schema({
    permalink: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    snippet: String,
    details: String,
    price: Number,
    created: Date,
    images: [String],
    likes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }]
});

// Use the schema to register a model with MongoDb
var Item = mongoose.model('Item', itemSchema);

// This function is responsible for returning all entries for the Item model
function getItems(req, res, next) {
    var i;

    res.setHeader('Access-Control-Allow-Origin', '*');

    Item.find().limit(20).sort({created: -1}).exec(function (err, items) {
        if (err) {
            return next(err);
        }
        var list = [];
        for (i = 0; i < items.length; i += 1) {
            list.push({permalink: items[i].permalink, name: items[i].name, snippet: items[i].snippet, price: items[i].price, image: items[i].images[0], likes: items[i].likes.length});
        }
        res.send(list);
        return next();
    });
}

// This function is responsible for creating a new Item
function postItem(req, res, next) {
    var item = new Item();

    res.setHeader('Access-Control-Allow-Origin', '*');

    item.permalink = req.params.permalink;
    item.name = req.params.name;
    item.snippet = req.params.snippet;
    item.details = req.params.details;
    item.price = req.params.price;
    item.created = new Date();
    item.images = req.params.images;
    item.likes = req.params.likes;

    item.save(function (err, item, numberAffected) {
        if (err) {
            return next(err);
        }
        res.send(201, item);
        return next();
    });
}

// Set up our routes and start the server
server.get({path: '/REST/items', version: '1.0.0'}, getItems);
server.post({path: '/REST/items', version: '1.0.0'}, postItem);


//TODO: find a better regex for whatever does't start with /REST
//TODO: why default?
server.get(/.*/, restify.serveStatic({
    directory: './app',
    default: 'index.html'
}));

var port = Number(process.env.PORT || 5000);
server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});
