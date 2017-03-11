'use strict';
import _              from 'lodash';
import commonUtils    from './common_utils';

let favouritePlacesUtils = {

    getSetIdsOfFavouritePlaces(){
        if(!commonUtils.isClient()){
            return new Set();
        }
        let myFavouritePlace = null;
        try{
            myFavouritePlace = localStorage.getItem('myFavouritePlace');
        }catch (e){
            alert(`Can't load data from local storage! ${e}`);
        }
        return (!_.isNull(myFavouritePlace) && !_.isEmpty(myFavouritePlace)) ? new Set(JSON.parse(myFavouritePlace)) : new Set();
    },

    saveSetIdsOfFavouritePlaces(setOfPlaces){
        if(!commonUtils.isClient()){
            return;
        }
        try{
            localStorage.setItem('myFavouritePlace', JSON.stringify(Array.from(setOfPlaces)));
        }catch (e){
            alert(`Can't save data to local storage! ${e}`);
        }
    },

    addFavouritePlace(id, setOfPlaces=favouritePlacesUtils.getSetIdsOfFavouritePlaces()){
        if(!commonUtils.isClient()){
            return;
        }
        let wasBeforeAdding;
        if(setOfPlaces.has(id)){
            wasBeforeAdding = true;
            setOfPlaces.delete(id);
        }else{
            setOfPlaces.add(id);
            wasBeforeAdding = false;
        }
        favouritePlacesUtils.saveSetIdsOfFavouritePlaces(setOfPlaces);
        return setOfPlaces;
    },

    isFavouritePlace(id, setOfPlaces=favouritePlacesUtils.getSetIdsOfFavouritePlaces()){
        if(!commonUtils.isClient()){
            return false;
        }
        return setOfPlaces.has(id);
    },

    favouritePlaceByRouteCount(route, setOfPlaces=favouritePlacesUtils.getSetIdsOfFavouritePlaces()){
        if(!commonUtils.isClient()){
            return [];
        }
        let returningRoute = {...route},
            placeIds = [];
        for(let stop of returningRoute.stops){
            for(let place of stop.places){
                placeIds.push(place.id);
            }
        }
        returningRoute.stars = _.intersection(Array.from(setOfPlaces), placeIds).length;
        return returningRoute;
    }

};

export default favouritePlacesUtils;


