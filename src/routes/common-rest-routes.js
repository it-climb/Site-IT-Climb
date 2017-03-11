'use strict';
const express = require('express'),
    router = express.Router(),
    pageDataLoader = require('../middlewares/data-loaders/page'),
    questionDataLoader = require('../middlewares/data-loaders/question'),
    boatDataLoader = require('../middlewares/data-loaders/boat'),
    ticketDataLoader = require('../middlewares/data-loaders/ticket'),
    interactiveMapLoader = require('../middlewares/data-loaders/interactive-map'),
    stopDataLoader = require('../middlewares/data-loaders/stops'),
    routeDataLoader = require('../middlewares/data-loaders/routes'),
    scheduleDataLoader = require('../middlewares/data-loaders/schedule'),
    insiderFormProcessor = require('../middlewares/data-loaders/insiderFormProcessor'),
    clearCache = require('../middlewares/clear-сache'),
    newsDataLoader = require('../middlewares/data-loaders/news');

router.get('/page/:name', pageDataLoader);

router.get('/questions', questionDataLoader);

router.get('/boats', boatDataLoader);

router.get('/stops', stopDataLoader);

router.get('/routes', routeDataLoader);

router.get('/tickets', ticketDataLoader);

router.get('/schedules', scheduleDataLoader);

router.get('/news', newsDataLoader);

router.get('/post', (req, res, next)=>{
    next();
});

router.get('/buy-ticket', (req, res, next) => {
    next();
});

router.get('/cruise-and-save', (req, res, next) => {
    next();
});

router.get('/schedule', (req, res, next) => {
    next();
});

router.get('/groups-and-charters', (req, res, next) => {
    next();
});

router.get('/get-more-lauderdale', (req, res, next) => {
    next();
});

router.get('/blog', (req, res, next) => {
    next();
});

router.get('/blog/:slug', (req, res, next) => {
    next();
});

router.get('/faq', (req, res, next) => {
    next();
});

router.get('/all-it-climb-stops', (req, res, next) => {
    next();
});

router.get('/perfect-picks', (req, res, next) => {
    next();
});

router.get('/interactive-map', interactiveMapLoader);

router.post('/insider-form', insiderFormProcessor);

router.all('/clear-cache', clearCache);

module.exports = router;