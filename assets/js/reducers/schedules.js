import * as Constants from '../constants/action-schedules-types';

export default (state = [], action) => {
    switch (action.type) {
        case Constants.SCHEDULES_LOAD:
            return {...action.schedules};
        default:
            return state;
    }
}