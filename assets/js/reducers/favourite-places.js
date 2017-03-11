import * as Constants from '../constants/favourite-places-types';
import commonUtils from '../utils/common_utils';
import favouritePlacesUtils from '../utils/favourite_places_utils';

const defaultState = {
    set: new Set()
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case Constants.ADD_FAVOURITE_PLACE:
            return {
                set: favouritePlacesUtils.addFavouritePlace(action.placeId)
            };
        default:
            if (commonUtils.isClient()) {
                return {
                    set: favouritePlacesUtils.getSetIdsOfFavouritePlaces()
                }
            }
            return state;
    }
}