
import { PUSH_CONTENT } from '../constants';

const defaultState = {};

export default (state = defaultState, action) => {
    switch (action.type) {
        case PUSH_CONTENT:
            return {
                ...state,
                ...action.content
            };
        default:
            return state;
    }
}