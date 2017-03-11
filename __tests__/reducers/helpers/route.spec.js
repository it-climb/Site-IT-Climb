'use strict';

import {routesLoader} from '../../../assets/js/reducers/helpers/routes';
import routes from '../../../mock-data/routes';

const defaultState = {
    items: [],
    total: 0,
    current: null,
    next: null,
    previous: null,
    allStops: [],
    allPlaces: []
};

describe('Route reducer', ()=> {
    it('Should merge loaded routes', ()=> {
        const nextState = routesLoader(defaultState, routes.items);
        
        expect(nextState.items.length).toBe(4);
        expect(nextState.allStops.length).toBe(20);
        expect(nextState.allPlaces.length).toBe(88);
    });
    
    it('Should throw error on any parameters missing', ()=> {
        expect(()=>{routesLoader()}).toThrow();
    })
});