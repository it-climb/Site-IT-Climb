'use strict';

import * as Constants from '../constants';

const defaultState = {
    filtersList: [],
    currentFilters: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case Constants.PUSH_INTERACTIVE_MAP_FILTERS:
            return {
                ...state,
                filtersList: action.content.mapFilters
            };
        case Constants.ADD_VISIBILITY_FILTER :
            return {
                ...state,
                currentFilters: state.currentFilters.concat(action.filter)
            };
        case Constants.REMOVE_VISIBILITY_FILTER:
            return {
                ...state,
                currentFilters: state.currentFilters.filter(filter=>filter != action.filter)
            };
        default:
            return state;
    }
}