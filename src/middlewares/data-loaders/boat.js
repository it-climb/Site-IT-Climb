'use strict';
const
    _ = require('lodash'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    Boat = require('../../models/cms-models/boat/model'),
    pushContent = require('../../../assets/js/actions').pushContent;

module.exports = (req, res, next) => {
    let boats = cache.get('boats') || [];
    
    if (!_.isEmpty(boats)) {
        req.dependencies = injector(req, [req.isServerRequest ? pushContent({boats}) : {boats}]);
        return next();
    }
    
    client
        .getEntries({
            content_type: 'boat',
            include: 3
        })
        .then(cmsBoats=> {

            let total = _.get(cmsBoats, 'total', 0),
                items = _.get(cmsBoats, 'items', []);
            boats = [];
            if(total>0){
                for(let item of items){
                    boats.push(new Boat(item));
                }
            }

            cache.set('boats', boats);
            req.dependencies = injector(req, [req.isServerRequest ? pushContent({boats}) : {boats}]);
            
            next();
        })
        .catch(err=>{
                console.log(err);
            next();
        });
    
};