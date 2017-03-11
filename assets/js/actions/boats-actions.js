import axios from 'axios';
import * as types from '../constants/action-boats-types';

const API_URL = '/api/boats';

export const loadBoatsPageData = () => dispatch => {
    axios.get(API_URL)
        .then(({ data })=>dispatch(loadedBoats(data.boats)))
        .catch(console.error)
};

export const loadedBoats = (boats) => ({
    type: types.BOATS_LOAD,
    boats
});
