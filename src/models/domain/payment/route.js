'use strict';
const express = require('express'),
    router = express.Router(),
    PaymentsService = require('./service'),
    requestUtils = require('../../../utils/request-utils'),
    logger = require('../../../utils/logger');

router.post('/checkout', (req, res, next) => {

    let {paymentData} = req.body,
        additionalData = {userAgent : requestUtils.getUserAgent(req)};

    PaymentsService.checkout(paymentData.ticketId, paymentData,  paymentData.stripeToken, additionalData)
        .then(()=> res)
        .catch(err=> {
            logger.error(err);
            res.boom.badData(err.message);
        });

});


module.exports = router;