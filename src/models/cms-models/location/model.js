'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid');

const defaultLocation = {
    lat: null,
    lng: null
};

class Location {

    constructor(location) {
        if(location){
            this.lat = location.lat || null;
            this.lng = location.lon || null;
        }else{
            Object.assign(this, defaultLocation);
        }

    }
}

module.exports = Location;