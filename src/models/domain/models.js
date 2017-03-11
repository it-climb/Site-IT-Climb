const mongoose    = require('mongoose'),
    fs = require('fs'),
    finder = require('fs-finder'),
    config = require('./../../config/index');

mongoose.Promise = require('bluebird');

let options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    user: config.mongodb.user,
    pass: config.mongodb.pass
};

mongoose.connect(config.mongodb.uri, options);

finder.from(__dirname).findFiles("model.js").forEach((file)=> {
    require(file);
});

var db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

module.exports = mongoose;