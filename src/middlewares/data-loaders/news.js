'use strict';
const
    _ = require('lodash'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    News = require('../../models/cms-models/news/model'),
    pushContent = require('../../../assets/js/actions').pushContent;

module.exports = (req, res, next) => {
    let news = cache.get('news') || [];
    
    if (!_.isEmpty(news)) {
        req.dependencies = injector(req, [req.isServerRequest ? pushContent({news}) : {news}]);
        return next();
    }
    
    client
        .getEntries({
            content_type: 'news',
            include: 3
        })
        .then(cmsNews=> {

            let total = _.get(cmsNews, 'total', 0),
                items = _.get(cmsNews, 'items', []);
            news = [];
            if(total>0){
                for(let item of items){
                    news.push(new News(item));
                }
            }

            cache.set('news', news);
            req.dependencies = injector(req, [req.isServerRequest ? pushContent({news}) : {news}]);
            
            next();
        })
        .catch(err=>{
            console.log(err);
            next();
        });
    
};