'use strict';

module.exports = (req, res, next) => {
    req.dependencies = [];
    return next();
};