'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    BaseModel = require('./../base-model/model'),
    Stop = require('../stop/model'),
    Route = require('../route/model'),
    Timetable = require('../timetable/model');

const defaultSchedule = {
    title : '',
    description: '',
    route: null,
    general : false,
    stops: [],
    timetable : [],
    note: '',
    otherImportantInformation : ''
};

class Schedule extends BaseModel {

    constructor(schedule, route) {
        super(schedule);

        if (schedule && schedule.fields) {
            let {fields} = schedule;
            this.title = fields.title || '';
            this.description = fields.description ||  '';
            this.route = (route) ? route : new Route(_.get(fields, 'route', null));
            this.general = fields.general;
            this.stops = (Array.isArray(fields.stops)) ?
                fields.stops
                    .filter(stop => !_.isUndefined(stop.fields))
                    .map((stop)=>new Stop(stop)) :
                [];
            this.timetable = (Array.isArray(fields.timetable)) ?
                fields.timetable
                    .filter(stop => !_.isUndefined(stop.fields))
                    .map((stop)=>new Timetable(stop)) :
                [];
            this.note = fields.note || '';
        } else {
            Object.assign(this, defaultSchedule);
        }
    }
}

module.exports = Schedule;