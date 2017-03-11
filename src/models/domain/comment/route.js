'use strict';
const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

router.get('/comments', (req, res, next) => {
/*    let StateModel = mongoose.model('Ticket');
    StateModel.find({}, (err, states)=> {
        if (!err){
            res.json(states);
        } else {
            res.boom.serverUnavailable(`Can't find state, because of ${err}`);
        }
    });*/
});


module.exports = router;