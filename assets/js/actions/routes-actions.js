import axios from 'axios';
import * as types from '../constants/action-routes-types';

const API_URL = '/api/routes';

export const loadRoutesPageData = (slug) => (dispatch, getState) => {
    const state = getState();
    const {areLoaded} = state.routes;
    
    if (areLoaded && !slug) return;
    
    axios.get(API_URL)
        .then(({ data })=>{
            dispatch(loadedRoutes(data.routes));
            if(slug){
                dispatch(routeChosen(slug));
            }
        })
        .catch(console.error)
};

export const loadedRoutes = (routes) => ({
    type: types.ROUTES_LOAD,
    routes
});

export const routeChosen = (slug) => ({
    type: types.ROUTE_CHOSEN,
    slug
});
