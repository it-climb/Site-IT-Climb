const mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

let Post = new mongoose.Schema({
    id: ObjectId,
    name: String,
    email: String,
    content: String,
    createdAt: Date
});

module.exports = mongoose.model('Post', Post);