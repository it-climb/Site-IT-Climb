import * as Constants from '../constants/action-questions-types';

export default (state = [], action) => {
    switch (action.type) {
        case Constants.QUESTIONS_LOAD:
            return {...action.questions};
        default:
            return state;
    }
}