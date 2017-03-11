const mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

let Payment = new mongoose.Schema({
    id: ObjectId
});

module.exports = mongoose.model('Payment', Payment);