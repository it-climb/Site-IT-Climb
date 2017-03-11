'use strict';
const cache = require('../utils/cache');

module.exports = (req, res, next) => {

    console.log('clear all cache');
    cache.flushAll();
    next();

};