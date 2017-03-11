'use strict';
const
    schedule = require('node-schedule'),
    RouteService = require('./models/cms-models/route/service'),
    TripAdvisorService = require('./models/domain/trip-advisor-data/service');

var SchedulerJobs = {

    updateTripAdviserData: ()=> {
        schedule.scheduleJob('0 1 * * * *', ()=> {
            RouteService.getAll().then(routes=> {
                return TripAdvisorService.updateAllTripAdvisorData(routes);
            }).catch(err=>{
                console.error(`Scheduler error occurred ${err}`);
            });
        });
    }

};

module.exports = SchedulerJobs;