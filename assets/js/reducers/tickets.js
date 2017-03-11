import * as Constants from '../constants/action-tickets-types';

export default (state = [], action) => {
    switch (action.type) {
        case Constants.TICKETS_LOAD:
            return {...action.tickets};
        default:
            return state;
    }
}