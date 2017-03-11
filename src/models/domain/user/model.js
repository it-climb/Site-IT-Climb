const mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

let User = new mongoose.Schema({
    id: ObjectId,
    email: String,
    password: String,
    city: String,
    state: String,
    data: {
        birthday: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'inactive']
        },
        mix: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    }
});

module.exports = mongoose.model('User', User);