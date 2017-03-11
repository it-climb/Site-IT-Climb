'use strict';
import _ from 'lodash';
import * as CommonConstants from '../../constants/index';
import favouritePlacesUtils from '../../utils/favourite_places_utils';


/**@func merge loaded routes in the reducer current state
 * @param {Object} state - current state
 * @param {Array} routes
 * @return {Object} nextState
 * */
export const routesLoader = (state, routes) => {
    if (!state || !routes) throw new Error('State and Routes are required!');
    
    const stopsWithPlaces = routes.reduce((stopsWithPlaces, route)=> {
        route.stops.forEach(stop=> {
            const parsedStop = {
                ...stop,
                places: stop.places.map(place=> {
                    if (stopsWithPlaces.allPlaces[place.id]) {
                        stopsWithPlaces.allPlaces[place.id].stopsIds = stopsWithPlaces.allPlaces[place.id].stopsIds.concat(place.stopsIds);
                    } else {
                        stopsWithPlaces.allPlaces[place.id] = place;
                    }
                    return place.id;
                })
            };

            if (stopsWithPlaces.allStops[stop.id]) {
                stopsWithPlaces.allStops[stop.id].routesIds = stopsWithPlaces.allStops[stop.id].routesIds.concat(stop.routesIds);
            } else {
                stopsWithPlaces.allStops[stop.id] = parsedStop;
            }
        });
        
        return stopsWithPlaces;
    }, {
        allStops: {},
        allPlaces: {}
    });
    
    
    return {
        ...state,
        areLoaded: true,
        items: routes,
        total: routes.length,
        allStops: Object.keys(stopsWithPlaces.allStops).map(stopId=>stopsWithPlaces.allStops[stopId]),
        allPlaces: Object.keys(stopsWithPlaces.allPlaces).map(placeId=>stopsWithPlaces.allPlaces[placeId]),
        filters: new Set(),
        filteredItems: routes,
        filteredItemsWithoutStops: routes
    }
};

/**
 * @func change filter event handler
 * @param state
 * @param action
 */
export const changeFilterInRouteReducerHandler = (state, action) => {
    if (action.type) {
        let {filters} = state;
        if (action.type == CommonConstants.ADD_VISIBILITY_FILTER) {
            filters.add(action.filter);
        } else if (action.type == CommonConstants.REMOVE_VISIBILITY_FILTER) {
            filters.delete(action.filter);
        }

        let filteredItems = filters.size==0 ? state.items : filteredPlacesInRoutes(state.items, filters),
            filteredItemsWithoutStops = filters.size==0 ? state.items : deleteStopsIfNoPlace(filteredItems),
            currentElements = filters.size==0 ? [state.current] : state.current && filteredItems.filter(route=>route.id == state.current.id) || null;

        let returningState = {
            ...state,
            filteredItems,
            filteredItemsWithoutStops,
            filters,
            filteredCurrent: currentElements && currentElements.length !=0 ? currentElements[0] : null
        };

        return returningState;
    }
};

/**
 * @func returning new array of routes without places which is not in filter set
 * @param incomeRoutes - routes elements
 * @param filters - set of places types
 * @param deleteStops - delete stop if no routes
 * @returns new routes
 */
export const filteredPlacesInRoutes = (/**Array*/incomeRoutes, /**Set*/filters, deleteStops = false) => {
    let routes = JSON.parse(JSON.stringify(incomeRoutes));

    let SetOfFavouritePlaces = null;
    if(filters.has(CommonConstants.MY_FAVOURITES)){
        SetOfFavouritePlaces = favouritePlacesUtils.getSetIdsOfFavouritePlaces();
    }

    favouritePlacesUtils.getSetIdsOfFavouritePlaces();

    for(let route of routes){
        for(let stop of route.stops){
            stop.places = stop.places.filter(place => {
                for(let placeType of place.type){
                    if(filters.has(placeType)
                        || (!_.isNull(SetOfFavouritePlaces) && favouritePlacesUtils.isFavouritePlace(place.id))){
                        return true;
                    }
                }
                return false;
            });
        }
        if(deleteStops){
            route.stops = route.stops.filter(stop=>stop.places.length!==0);
        }
    }

    return routes;

};

/**
 * @func returning new array of routes without stops if no place
 * @param incomeRoutes - routes elements
 * @returns new routes
 */
export const deleteStopsIfNoPlace = (/**Array*/incomeRoutes) => {

    let routes = JSON.parse(JSON.stringify(incomeRoutes));

    for(let route of routes){
        route.stops = route.stops.filter(stop=>stop.places.length!==0);
    }

    return routes;

};