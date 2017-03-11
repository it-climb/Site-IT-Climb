import axios from 'axios';
import * as types from '../constants/action-schedules-types';

const API_URL = '/api/schedules';

export const loadSchedulesPageData = () => dispatch => {
    axios.get(API_URL)
        .then(({ data })=>dispatch(loadedSchedules(data.schedules)))
        .catch(console.error)
};

export const loadedSchedules = (schedules) => ({
    type: types.SCHEDULES_LOAD,
    schedules
});
