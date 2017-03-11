import * as Constants from '../constants/action-boats-types';

export default (state = [], action) => {
    switch (action.type) {
        case Constants.BOATS_LOAD:
            return {...action.boats};
        default:
            return state;
    }
}