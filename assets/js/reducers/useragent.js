"use strict";

import * as Constants from '../constants';

const defaultState = {
    agent: ''
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case Constants.POPULATE_USER_AGENT:
            return {
                ...state,
                agent: action.agent
            };
        default:
            return state;
    }
}