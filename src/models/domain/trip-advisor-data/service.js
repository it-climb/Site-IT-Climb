'use strict';
const config = require('./../../../config/index'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    boom = require('boom'),
    mongoose = require('mongoose'),
    axios = require('axios'),
    TripAdvisorDataModel = mongoose.model('TripAdvisorData');

const tripAdvisorApiLink = 'http://api.tripadvisor.com/api/partner/2.0/location';

let TripAdvisorService = {

    getDataByLocationId: locationId => {
        return axios.get(`${tripAdvisorApiLink}/${locationId}?key=${config.tripAdvisor.key}`)
            .then(response=> {
                if (response.status == 200) {
                    let {data} = response;
                    let {review_rating_count} = data;
                    let review_count = 0;
                    for(let count of Object.keys(review_rating_count)){
                        review_count += parseInt(review_rating_count[count]);
                    }
                    return TripAdvisorDataModel
                        .create(
                            {
                                locationId,
                                rating: data.rating,
                                rating_image_url: data.rating_image_url,
                                url: data.web_url,
                                data: JSON.stringify(data),
                                review_count: review_count,
                                openHours: JSON.stringify(data.hours),
                                address: JSON.stringify(data.address_obj)
                            }
                        )
                }
            })
            .catch(error=> {
                console.error(error);
                throw new error;
            });
    },

    updateTripAdvisorData: tripAdvisorData => {
        return axios.get(`${tripAdvisorApiLink}/${tripAdvisorData.locationId}?key=${config.tripAdvisor.key}`)
            .then(response=> {
                if (response.status == 200) {
                    let {data} = response;
                    let {review_rating_count} = data;
                    let review_count = 0;
                    for(let count of Object.keys(review_rating_count)){
                        review_count += parseInt(review_rating_count[count]);
                    }
                    tripAdvisorData.rating = data.rating;
                    tripAdvisorData.rating_image_url = data.rating_image_url;
                    tripAdvisorData.url = data.web_url;
                    tripAdvisorData.data = JSON.stringify(data);
                    tripAdvisorData.review_count = review_count;
                    return tripAdvisorData.save();
                }
            })
            .catch(error=> {
                console.error(error);
                throw new error;
            });
    },

    _getTripAdvisorIdsFromRoute(route){
        let tripAdvisorIds = [];
        for(let stop of route.stops){
            tripAdvisorIds = tripAdvisorIds.concat(TripAdvisorService._getTripAdvisorIdsFromStop(stop));
        }
        return tripAdvisorIds;
    },

    _getTripAdvisorIdsFromStop(stop){
        let tripAdvisorIds = [];
        for(let place of stop.places){
            let {tripAdvisorId} = place;
            if(tripAdvisorId){
                tripAdvisorIds.push(tripAdvisorId);
            }
        }
        return tripAdvisorIds;
    },

    _populateRoutes(routes, tripAdvisorData){
        for(let route of routes){
            route.stops = TripAdvisorService._populateStops(route.stops, tripAdvisorData);
        }
        return routes;
    },

    _populateStops(stops, tripAdvisorData){
        for(let stop of stops){
            stop.places = TripAdvisorService._populatePlaces(stop.places, tripAdvisorData);
        }
        return stops;
    },

    _populatePlaces(places, tripAdvisorData){
        for(let place of places){
            if(_.isNull(place.tripAdvisorId)){
                continue;
            }
            let findIndex = null;
            for(let i=0; i<tripAdvisorData.length; i++){
                if(tripAdvisorData[i].locationId == place.tripAdvisorId){
                    findIndex = i;
                    break;
                }
            }
            if(!_.isNull(findIndex)){
                let data = tripAdvisorData[findIndex];
                delete data.data;
                place.tripAdviserData =  data;
                tripAdvisorData.slice(findIndex, 1);
            }
        }
        return places;
    },

    wrapRoutes: routes =>{
        let tripAdvisorIds = [];

        for(let route of routes){
            tripAdvisorIds = tripAdvisorIds.concat(TripAdvisorService._getTripAdvisorIdsFromRoute(route))
        }

        if(_.isEmpty(tripAdvisorIds)){
            return Promise.resolve(routes);
        }

        return TripAdvisorDataModel
            .find({locationId : {
                $in: tripAdvisorIds}})
            .exec()
            .then(result=>{
                let resultForComparing = result.slice();
                let idsWithoutData = tripAdvisorIds
                    .filter(id=> {
                        let elementIndex = null;
                        for (let i = 0; i <resultForComparing.length; i++) {
                            if (resultForComparing[i].locationId == id) {
                                elementIndex = i;
                                break;
                            }
                        }
                        if (_.isNull(elementIndex)) {
                            return true;
                        } else {
                            resultForComparing.slice(elementIndex, 1);
                            return false;
                        }
                    });

                return Promise.join(
                    routes,
                    result,
                    Promise.map(idsWithoutData, (id)=>{
                        return TripAdvisorService.getDataByLocationId(id)
                    })
                );

            })
            .spread((routes, oldTripAdviserData, newTripAdviserData)=>{
                return Promise.resolve(TripAdvisorService._populateRoutes(routes, oldTripAdviserData.concat(newTripAdviserData)));
            })
            .catch(error=>{
                console.error('error', error);
                throw new error;
            });
    },

    parseTripAdvisorLink(tripAdvisorURL){
        if(_.isNull(tripAdvisorURL)){
            return null;
        }
        let searchResult  = tripAdvisorURL.match(/-d[0-9]{5,}/);
        if(searchResult.length===1){
            let value = searchResult[0];
            return parseInt(value.substring(2, value.length));
        }else {
            return null;
        }
    },

    updateAllTripAdvisorData(routes){
        let tripAdvisorIds = [];

        for(let route of routes){
            tripAdvisorIds = tripAdvisorIds.concat(TripAdvisorService._getTripAdvisorIdsFromRoute(route))
        }

        if(_.isEmpty(tripAdvisorIds)){
            return;
        }

        TripAdvisorDataModel
            .find({locationId : {
                $in: tripAdvisorIds}})
            .exec()
            .then(result=>{
                return Promise.map(result, (tripAdvisorData)=>{
                        return TripAdvisorService.updateTripAdvisorData(tripAdvisorData);
                    });
            })
            .spread(newTripAdviserData=>{
                return newTripAdviserData;
            })
            .catch(error=>{
                console.error('error', error);
                throw new error;
            });

    }

};

module.exports = TripAdvisorService;