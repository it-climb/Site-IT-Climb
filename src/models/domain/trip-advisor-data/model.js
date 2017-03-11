const mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

let TripAdvisorData = new mongoose.Schema({
    id: ObjectId,
    locationId: {type: Number },
    rating: { type: Number, min: 1, max: 5 },
    rating_image_url: String,
    url: String,
    data: String,
    review_count: { type: Number },
    openHours: String,
    address: String,
    createdAt: {
            type: Date,
            default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TripAdvisorData', TripAdvisorData);