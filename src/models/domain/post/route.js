'use strict';
const express = require('express'),
    router = express.Router(),
    PostService = require('./service'),
    requestUtils = require('../../../utils/request-utils'),
    logger = require('../../../utils/logger');

router.get('/post', (req, res, next) => {

    let {paymentData} = req.body,
        additionalData = {userAgent : requestUtils.getUserAgent(req)};

    PostService.getAll()
        .then(()=> res)
        .catch(err=> {
            logger.error(err);
            res.boom.badData(err.message);
        });

});

router.post('/post', (req, res, next) => {

    PostService.create()
        .then(()=> res)
        .catch(err=> {
            logger.error(err);
            res.boom.badData(err.message);
        });

});


module.exports = router;