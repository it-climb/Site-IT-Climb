'use strict';

import * as Constants from '../constants/action-insider-signup';

const defaultState = {
    errors: {
        name: false,
        city: false,
        email: false
    },
    fields: {
        name: '',
        email: '',
        city: '',
        usaState: ''
    },
    isSubmitted: false
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case Constants.CHANGE_FIELD:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.field]: action.value
                }
            };
        case Constants.CHECK_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.isValid
                }
            };
        case Constants.TOGGLE_SUBMISSION:
            return {
                ...state,
                isSubmitted: true
            };
        case Constants.CLEAR_FORM:
            return defaultState;
        default:
            return state;
    }
}