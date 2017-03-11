'use strict';
const
    _ = require('lodash'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    Ticket = require('../../models/cms-models/ticket/model'),
    pushContent = require('../../../assets/js/actions').pushContent;

module.exports = (req, res, next) => {
    let tickets = cache.get('tickets') || [];
    
    if (!_.isEmpty(tickets)) {
        req.dependencies = injector(req, [req.isServerRequest ? pushContent({tickets}) : {tickets}]);
        return next();
    }
    
    client
        .getEntries({
            content_type: 'ticket',
            include: 3
        })
        .then(cmsTickets=> {

            let total = _.get(cmsTickets, 'total', 0),
                items = _.get(cmsTickets, 'items', []);
            tickets = [];
            if(total>0){
                for(let item of items){
                    tickets.push(new Ticket(item));
                }
            }

            cache.set('tickets', tickets);
            req.dependencies = injector(req, [req.isServerRequest ? pushContent({tickets}) : {tickets}]);
            
            next();
        })
        .catch(err=>{
                console.log(err);
            next();
        });
    
};