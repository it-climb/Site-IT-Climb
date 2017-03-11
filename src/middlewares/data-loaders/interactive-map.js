'use strict';

const
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    _ = require('lodash'),
    injector = require('../../utils/dependencyInjector'),
    pushInteractiveMapFilters = require('../../../assets/js/actions').pushInteractiveMapFilters;

module.exports = (req, res, next) => {
    let mapFilters = cache.get('mapFilters');
    
    if (mapFilters) {
        req.dependencies = injector(req, [req.isServerRequest ? pushInteractiveMapFilters({mapFilters}) : {mapFilters}]);
        return next();
    }
    
    client
        .getContentType('place')
        .then(cmsPlaceContentType=>{
            mapFilters = _.get(_.get(_.get(cmsPlaceContentType, 'fields', []).filter(field=>field.id == 'type'), '[0].items.validations', []).filter(validator=>validator.hasOwnProperty('in')), '[0].in', []);
       
            cache.set('mapFilters', mapFilters);
    
            req.dependencies = injector(req, [req.isServerRequest ? pushInteractiveMapFilters({mapFilters}) : {mapFilters}]);
            
            return next();
        })
        .catch(console.log)
};