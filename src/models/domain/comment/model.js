const mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

let Comment = new mongoose.Schema({
    id: ObjectId,
    name: String,
    email: String,
    content: String
});

module.exports = mongoose.model('Comment', Comment);