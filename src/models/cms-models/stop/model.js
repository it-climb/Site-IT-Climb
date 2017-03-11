'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    Media = require('./../media/model'),
    BaseModel = require('./../base-model/model'),
    Location = require('../location/model'),
    Place = require('./../place/model');

const defaultStop = {
    title: '',
    shortName: '',
    locationName: '',
    location: null,
    thumbnail: null,
    icon: null,
    mapMarker: null,
    shortDescription: '',
    fullDescription: '',
    routesIds: [],
    places: []
};

class Stop extends BaseModel{

    constructor(stop, routeId) {
        super(stop);
        if(stop && stop.fields){
            let {fields} = stop;
            this.title = fields.title || '';
            this.shortName = fields.shortName || '';
            this.locationName = fields.locationName || '';
            this.thumbnail = new Media(_.get(fields, 'thumbnail', null));
            this.icon = new Media(_.get(fields, 'icon', null));
            this.mapMarker = new Media(_.get(fields, 'mapMarker', null));
            this.shortDescription = fields.shortDescription || 0;
            this.fullDescription = fields.fullDescription || 0;
            this.places = (Array.isArray(fields.places)) ?
                fields.places
                    .filter(place => !_.isUndefined(place.fields))
                    .map((place)=>new Place(place, this.id)) :
                [];
            this.location = fields.location && new Location(fields.location) || null;
            this.routesIds = routeId ? [routeId] : [];
        }else{
            Object.assign(this, defaultStop);
        }
    }
}

module.exports = Stop;