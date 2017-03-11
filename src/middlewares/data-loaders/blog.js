'use strict';
const
    _ = require('lodash'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    BlogPost = require('../../models/cms-models/blog/model'),
    pushContent = require('../../../assets/js/actions').pushContent,
    EntityListWrapper = require('./../../models/wrappers/entity-list-wrapper');

module.exports = (req, res, next) => {

    let entry_id = _.get(req, 'query.slug', null),
        date = _.get(req, 'query.date', null),
        query = {
            content_type: 'blogPost',
        };

    if (entry_id) {
        query['sys.id'] = entry_id;
        query.limit = 1;
    }
    else if (date) {
        query['sys.id'] = entry_id;
    }
    else {
        query.include = 10;
    }

    let cacheName = JSON.stringify(query),
        blogItems = cache.get(cacheName) || [];

    if (!_.isEmpty(blogItems)) {
        console.log('loaded blog from cache');
        req.dependencies = injector(req, [req.isServerRequest ? pushContent(blogItems) : blogItems]);
        return next();
    }

    client
        .getEntries(query)
        .then(cmsBlogPosts=> {

            console.log('loaded blog from contentful');

            let total = _.get(cmsBlogPosts, 'total', 0),
                items = _.get(cmsBlogPosts, 'items', []);
            let blogPosts = [];
            if(total>0){
                for(let item of items){
                    blogPosts.push(new BlogPost(item));
                }
            }

            let blogItems = new EntityListWrapper(blogPosts);
            cache.set(cacheName, blogItems);
            req.dependencies = injector(req, [req.isServerRequest ? pushContent(blogItems) : blogItems]);
            next();
        })
        .catch(err=>{
            console.error(err);
            next();
        });
    
};