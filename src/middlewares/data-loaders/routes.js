'use strict';
const
    _ = require('lodash'),
    Promise = require('bluebird'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    Route = require('../../models/cms-models/route/model'),
    pushContent = require('../../../assets/js/actions').pushContent,
    RouteService = require('../../models/cms-models/route/service'),
    TripAdvisorService = require('../../models/domain/trip-advisor-data/service');

module.exports = (req, res, next) => {

    let routes = cache.get('routes') || [];

    if (!_.isEmpty(routes)) {
        req.dependencies = injector(req, [req.isServerRequest ? pushContent({routes}) : {routes}]);
        return next();
    }

    RouteService.getAll()
        .then(routes=> {
            return TripAdvisorService.wrapRoutes(routes);
        })
        .then(routes=> {
            cache.set('routes', routes);
            req.dependencies = injector(req, [req.isServerRequest ? pushContent({routes}) : {routes}]);
            next();
        })
        .catch(err=> {
            console.log(err);
            next();
        });

};