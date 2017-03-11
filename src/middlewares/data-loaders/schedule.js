'use strict';
const
    _ = require('lodash'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    Schedule = require('../../models/cms-models/schedule/model'),
    pushContent = require('../../../assets/js/actions').pushContent;

module.exports = (req, res, next) => {

    let schedules = cache.get('schedule') || [];

    if (!_.isEmpty(schedules)) {
        req.dependencies = injector(req, [req.isServerRequest ? pushContent({schedules}) : {schedules}]);
        return next();
    }

    client
        .getEntries({
            content_type: 'schedule',
            include: 3
        })
        .then(cmsStops=> {

            let total = _.get(cmsStops, 'total', 0),
                items = _.get(cmsStops, 'items', []);
            schedules = [];
            if(total>0){
                for(let item of items){
                    schedules.push(new Schedule(item));
                }
            }

            cache.set('schedule', schedules);
            req.dependencies = injector(req, [req.isServerRequest ? pushContent({schedules}) : {schedules}]);

            next();
        })
        .catch(err=>{
            console.log(err);
            next();
        });

};