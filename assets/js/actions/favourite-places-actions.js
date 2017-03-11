import axios from 'axios';
import * as types from '../constants/favourite-places-types';

export const addFavouritePlace = (placeId) => ({
    type: types.ADD_FAVOURITE_PLACE,
    placeId
});
