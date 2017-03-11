'use strict';
const config = require('./../../../config/index'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    client = require('../../../utils/contentfulClient'),
    boom = require('boom'),
    Route = require('./model');

let RouteService = {

    getAll: ()=> {

        return client
            .getEntries({
                content_type: 'route',
                include: 3
            })
            .then(cmsRoutes=> {

                let total = _.get(cmsRoutes, 'total', 0),
                    items = _.get(cmsRoutes, 'items', []);
                let routes = [];
                if (total > 0) {
                    for (let item of items) {
                        routes.push(new Route(item));
                    }
                }

                return Promise.resolve(routes);

            })
            .catch(err=> {
                console.error(err);
                throw new err;
            });

    }

};

module.exports = RouteService;