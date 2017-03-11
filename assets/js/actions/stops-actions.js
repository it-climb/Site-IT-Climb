import axios from 'axios';
import * as types from '../constants/action-stops-types';

const API_URL = '/api/stops';

export const loadStopsPageData = () => dispatch => {
    axios.get(API_URL)
        .then(({ data })=>dispatch(loadedStops(data.stops)))
        .catch(console.error)
};

export const loadedStops = (stops) => ({
    type: types.STOPS_LOAD,
    stops
});
