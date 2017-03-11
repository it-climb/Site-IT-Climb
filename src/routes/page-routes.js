'use strict';

const express = require('express'),
    router = express.Router(),
    interactiveMapLoader = require('../middlewares/data-loaders/interactive-map');


router.get('/', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/buy-ticket', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/cruise-and-save', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/schedule', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/post', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/groups-and-charters', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/get-more-lauderdale', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/blog', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/blog/:slug', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/faq', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/all-it-climb-stops', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/perfect-picks', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

router.get('/interactive-map', (req, res, next) => {
    req.isServerRequest = true;
    interactiveMapLoader(req, res, next);
});

router.get('/checkout', (req, res, next) => {
    req.isServerRequest = true;
    next();
});


router.get('/route/:slug', (req, res, next) => {
    req.isServerRequest = true;
    next();
});

module.exports = router;