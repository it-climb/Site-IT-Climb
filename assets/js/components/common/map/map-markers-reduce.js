"use strict";

/**@func convert routes object with stops and places to array of objects with icon and location coordinates
 * @param {Object} routes
 * @return {Array} markers - reduced array of markers
 * */

const defaultState = {
    filteredItems: []
};

export default (routes = defaultState) => {
    const {filteredItems} = routes;
    if (filteredItems.length == 0) return [];
    
    return filteredItems
        .reduce((markers, route)=> {
            if (!route.stops || route.stops.length == 0) return markers;
            
            return markers
                .concat(
                    route
                        .stops
                        .reduce((stopsMarkers, stop)=> {
                            stopsMarkers = stopsMarkers.concat([{
                                ...stop,
                                icon: stop.mapMarker && stop.mapMarker.url || null,
                                location: stop.location && {lat: stop.location.lat, lng: stop.location.lng} || null,
                                isStop: true
                            }]);
                            
                            if (!stop.places || stop.places.length == 0) return stopsMarkers;
                            
                            return stopsMarkers.concat(
                                stop
                                    .places
                                    .reduce((placesMarkers, place)=>{
                                        return placesMarkers.concat({
                                            ...place,
                                            icon: place.mapMarker && place.mapMarker.url || null,
                                            location: place.location && {lat: place.location.lat, lng: place.location.lng},
                                            isStop: false
                                        })
                                    }, [])
                            )
                        }, [])
                );
        }, [])
}