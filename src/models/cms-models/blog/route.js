'use strict';
const express = require('express'),
    router = express.Router(),
    blogLoader = require('../../../middlewares/data-loaders/blog');

router.get('/blog-posts', (req, res, next) => {
    blogLoader(req, res, next);
});

router.get('/blog-posts/:slug', (req, res, next) => {
    blogLoader(req, res, next);
});

router.get('/blog-posts/:date', (req, res, next) => {
    blogLoader(req, res, next);
});



module.exports = router;