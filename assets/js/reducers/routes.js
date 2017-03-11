import * as Constants from '../constants/action-routes-types';
import * as CommonConstants from '../constants/index';
import favouritePlacesUtils from '../utils/favourite_places_utils';
import {routesLoader, changeFilterInRouteReducerHandler, } from './helpers/routes';

const defaultState = {
    items: [],
    total: 0,
    areLoaded: false,
    current: null,
    next: null,
    previous: null,
    allStops: [],
    allPlaces: [],
    filters: new Set(),
    filteredItems: [],
    filteredItemsWithoutStops: [],
    filteredCurrent: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case Constants.ROUTES_LOAD:
            return routesLoader(state, action.routes);
        case Constants.ROUTE_CHOSEN:
            let position = {},
                {items} = state,
                founded = false,
                {slug} = action;
            if (Array.isArray(items) && items.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    if ((items[i].slug) === slug) {
                        position.current = items[i];
                        position.filteredCurrent = items[i];
                        position.next = items[(i + 1) == items.length ? 0 : i + 1];
                        position.previous = items[(i - 1) == -1 ? items.length - 1 : i - 1];
                        founded = true;
                        break;
                    }
                }
            }

            if (!founded) {
                position = {
                    current: null,
                    next: null,
                    previous: null,
                    filteredCurrent: null
                }
            } else {
                let setOfPlaces = favouritePlacesUtils.getSetIdsOfFavouritePlaces();
                position.next = favouritePlacesUtils.favouritePlaceByRouteCount(position.next, setOfPlaces);
                position.previous = favouritePlacesUtils.favouritePlaceByRouteCount(position.previous, setOfPlaces);
            }

            let returningState = {
                ...state,
                ...position,
                items: state.items,
                total: state.total,
                allStops: state.allStops,
                allPlaces: state.allPlaces,
                filters: new Set(),
                filteredItems: state.items,
                filteredItemsWithoutStops: state.items
            };

            return returningState;
        case CommonConstants.ADD_VISIBILITY_FILTER:
        case CommonConstants.REMOVE_VISIBILITY_FILTER:
            return changeFilterInRouteReducerHandler(state, action);
        default:
            return state;
    }
}
