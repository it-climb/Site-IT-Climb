import * as Constants from '../constants/action-stops-types';

export default (state = [], action) => {
    switch (action.type) {
        case Constants.STOPS_LOAD:
            return {...action.stops};
        default:
            return state;
    }
}