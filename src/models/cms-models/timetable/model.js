'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    BaseModel = require('./../base-model/model');

const defaultTimetable = {
    timetable : []
};

class Timetable extends BaseModel {

    constructor(scheduleItem) {
        super(scheduleItem);

        if(scheduleItem && scheduleItem.fields){
            let {fields} = scheduleItem;
            this.timetable = (!_.isEmpty(fields.timetable) && (typeof fields.timetable === 'string')) ?
                fields.timetable.split(';') :
                [];
        }else{
            Object.assign(this, defaultTimetable);
        }
    }
}

module.exports = Timetable;