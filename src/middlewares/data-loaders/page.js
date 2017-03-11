'use strict';
const
    _ = require('lodash'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    Home = require('../../models/cms-models/page/model'),
    pushContent = require('../../../assets/js/actions').pushContent;

module.exports = (req, res, next) => {

    let filterName = null;

    if(req.params && req.params.name){
        filterName = req.params.name;
    }

    let cacheName = _.isNull(filterName) ? 'pages' : `pages-${filterName}`,
        pages = cache.get(cacheName);


    if (!_.isEmpty(pages)) {
        req.dependencies = injector(req, [req.isServerRequest ? pushContent({pages}) : {pages}]);
        return next();
    }

    let query = {
        content_type: 'home',
        limit: 10,
        include: 10
    };

    /*if(filterName){
        query.fields = [{name:filterName}];
    }*/
    
    client
        .getEntries(query)
        .then(cmsPages=> {

            let total = _.get(cmsPages, 'total', 0),
                items = _.get(cmsPages, 'items', []);
            pages = [];
            if(total>0){
                for(let item of items){
                    let pageName = _.get(item, 'fields.name', '');
                    if(pageName!==filterName){
                        continue;
                    }
                    pages.push(new Home(item));
                }
            }

            cache.set(cacheName, pages);
            
            req.dependencies = injector(req, [req.isServerRequest ? pushContent({pages}) : {pages}]);
            
            next();
        })
        .catch(err=>{
            console.log(err);
            next();
        });
    
};