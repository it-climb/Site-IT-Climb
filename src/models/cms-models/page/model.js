'use strict';

const
    _ = require('lodash'),
    uuid = require('uuid'),
    Media = require('./../media/model'),
    Route = require('./../route/model'),
    Ticket = require('./../ticket/model'),
    BlogPost = require('./../blog/model');

const defaultPage = {
    id: uuid.v4(),
    title: '',
    banner: null,
    topParagraph: '',
    perfectPicksPart: '',
    cruiseAndSavePart: '',
    schedulePart: '',
    brandText: '',
    groupsAndChartersPart: '',
    fixedRoutes: [],
    blogPart:'',
    ticketFixed: null,
    moreLauderdalePart: [],
    fixedBlogPost: null
};

class Page{

    constructor(home){

        if (home && home.fields && home.sys) {
            this.id = home.sys.id || uuid.v4();
            let {fields} = home;
            this.name = fields.name || '';
            this.title = fields.title || '';
            this.banner = new Media(_.get(fields, 'banner', null));
            this.topParagraph = fields.topParagraph || '';
            this.perfectPicksPart = fields.perfectPicksPart || '';
            this.cruiseAndSavePart = fields.cruiseAndSavePart || '';
            this.schedulePart = fields.schedulePart || '';
            this.brandText = fields.brandText || '';
            this.groupsAndChartersPart = fields.groupsAndChartersPart || '';
            this.fixedRoutes = _.get(fields, 'fixedRoutes', [])
                .filter(route => !_.isUndefined(route.fields))
                .map(route => new Route(route));
            this.fixedBlogPost = new BlogPost(_.get(fields, 'fixedBlogPost', null));
            this.blogPart = fields.blogPart || '';
        }else{
            Object.assign(this, defaultPage);
        }
    }

}

module.exports = Page;