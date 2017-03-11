'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    Media = require('./../media/model'),
    BaseModel = require('./../base-model/model'),
    Stop = require('./../stop/model');

const defaultRoute = {
    title: '',
    thumbnail: null,
    icon: null,
    shortDescription: '',
    fullDescription: '',
    groupTour : false,
    slug: null,
    coordinates: {
        items: []
    },
    stops: [],
    color: null,
    index : null
};

class Route extends BaseModel {

    constructor(route) {
        super(route);
        if(route && route.fields){
            let {fields} = route;
            this.title = fields.title || '';
            this.thumbnail = new Media(_.get(fields, 'thumbnail', null));
            this.icon = new Media(_.get(fields, 'icon', null));
            this.shortDescription = fields.shortDescription || 0;
            this.fullDescription = fields.fullDescription || 0;
            this.groupTour = fields.groupTour || false;
            this.slug = fields.slug || null;
            this.index =  fields.index || null
            this.stops = (Array.isArray(fields.stops)) ?
                fields.stops
                    .filter(stop => !_.isUndefined(stop.fields))
                    .map((stop)=>new Stop(stop, this.id)) :
                [];
            this.coordinates = fields.coordinates || {items: []};
            this.color = fields.color || null;
        }else{
            Object.assign(this, defaultRoute);
        }
    }
}

module.exports = Route;