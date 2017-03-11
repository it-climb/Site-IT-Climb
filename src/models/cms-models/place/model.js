'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    Media = require('./../media/model'),
    BaseModel = require('./../base-model/model'),
    Location =  require('./../location/model'),
    TripAdvisorService = require('../../domain/trip-advisor-data/service');

const defaultPlace = {
    title: '',
    type: '',
    description: '',
    thumbnail: null,
    icon: null,
    mapMarker: null,
    nearbyAttraction: false,
    discount: '',
    location: null,
    tripAdvisorId : null,
    stopsIds: []
};

class Place extends BaseModel {

    constructor(place, stopId) {
        super(place);
        if (place && place.fields) {
            let {fields} = place;
            this.title = fields.title || '';
            this.type = fields.type || '';
            this.description = fields.description || '';
            this.thumbnail = new Media(_.get(fields, 'thumbnail', null));
            this.icon = new Media(_.get(fields, 'icon', null));
            this.mapMarker = new Media(_.get(fields, 'mapMarker', null));
            this.nearbyAttraction = fields.nearbyAttraction || false;
            this.discount = fields.discount || '';
            this.location = (fields.location) ? new Location(fields.location) : null;
            this.tripAdvisorId = fields.tripAdvisorLink && TripAdvisorService.parseTripAdvisorLink(fields.tripAdvisorLink) || null;
            this.photos = (Array.isArray(fields.photos)) ?
                fields.photos
                    .filter(photo => !_.isUndefined(photo.fields))
                    .map((photo)=>new Media(photo)) :
                [];
            this.stopsIds = stopId ? [stopId] : [];
        } else {
            Object.assign(this, defaultPlace);
        }
    }
}

module.exports = Place;