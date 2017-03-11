'use strict';

import axios from 'axios';
import { pushInteractiveMapFilters } from '../actions';

const API_URL = '/api/interactive-map';

export const loadInteractiveMapFilters = () => dispatch => {
    axios.get(API_URL)
        .then(({ data })=>dispatch(pushInteractiveMapFilters(data)))
        .catch(console.error);
};