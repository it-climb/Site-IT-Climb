'use strict';
const config = require('./../../../config/index'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    client = require('../../../utils/contentfulClient'),
    boom = require('boom'),
    Stop = require('./model');

let StopService = {

    getAll: ()=> {

        return client
            .getEntries({
                content_type: 'stop',
                include: 3
            })
            .then(cmsStops=> {

                let total = _.get(cmsStops, 'total', 0),
                    items = _.get(cmsStops, 'items', []);
                let stops = [];
                if (total > 0) {
                    for (let item of items) {
                        stops.push(new Stop(item));
                    }
                }

                return Promise.resolve(stops);

            })
            .catch(err=> {
                console.error(err);
                throw new err;
            });

    }

};

module.exports = StopService;