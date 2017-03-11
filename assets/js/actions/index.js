'use strict';

import * as Constants from '../constants';
import axios from 'axios';

export const pushContent = (content) => ({
    type: Constants.PUSH_CONTENT,
    content
});

export const pushInteractiveMapFilters = content => ({
    type: Constants.PUSH_INTERACTIVE_MAP_FILTERS,
    content
});
export const addVisibilityFilter = (filter) => ({
    type: Constants.ADD_VISIBILITY_FILTER,
    filter
});

export const removeVisibilityFilter = filter => ({
    type: Constants.REMOVE_VISIBILITY_FILTER,
    filter
});

export const pushError = (error) => ({
    type: Constants.PUSH_ERROR,
    error
});

export const clearError = () => ({
    type: Constants.CLEAR_ERROR
});