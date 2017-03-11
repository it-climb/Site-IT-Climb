'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    Media = require('./../media/model'),
    BaseModel = require('./../base-model/model');

const defaultBoat = {
    name: '',
    class: '',
    passengerMax: 0,
    pdf: null,
    index: null
};

class Boat extends BaseModel{

    constructor(boat) {
        super(boat);
        if(boat && boat.fields){
            let {fields} = boat;
            this.name = fields.name || '';
            this.class = fields.class || '';
            this.passengerMax = fields.passengerMax || 0;
            this.pdf = new Media(_.get(fields, 'pdf', null)),
            this.index = fields.index || null
        }else{
            Object.assign(this, defaultBoat);
        }
    }
}

module.exports = Boat;