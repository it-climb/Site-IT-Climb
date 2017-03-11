'use strict';
const
    _ = require('lodash'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    Stop = require('../../models/cms-models/stop/model'),
    pushContent = require('../../../assets/js/actions').pushContent,
    TripAdvisorService = require('../../models/domain/trip-advisor-data/service'),
    StopService = require('../../models/cms-models/stop/service');

module.exports = (req, res, next) => {
    let stops = cache.get('stop') || [];

    if (!_.isEmpty(stops)) {
        req.dependencies = injector(req, [req.isServerRequest ? pushContent({stops}) : {stops}]);
        return next();
    }

    StopService.getAll()
        .then(stops=> {
            cache.set('stops', stops);
            req.dependencies = injector(req, [req.isServerRequest ? pushContent({stops}) : {stops}]);
            next();
        })
        .catch(err=>{
            console.log(err);
            next();
        });

};