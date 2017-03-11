'use strict';

import { PUSH_ERROR, CLEAR_ERROR } from '../constants';

const defaultState = {
    isError: false,
    message: '',
    status: 500
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case PUSH_ERROR:
            return {
                isError: true,
                message: action.error.message,
                status: action.error.statusCode
            };
        case CLEAR_ERROR:
            return defaultState;
        default:
            return state;
    }
}