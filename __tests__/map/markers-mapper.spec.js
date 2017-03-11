"use strict";

import mapper from '../../assets/js/components/common/map/map-markers-reduce';
import routes from '../../mock-data/routes';

describe('Mapper of routes object to markers array test', ()=> {
    test('Should return empty array on missing routes object', ()=> {
        const result = mapper();
        expect(result).toEqual([]);
    });
    
    test('Should return empty array on empty routes object with zero items', ()=> {
        const emptyRoutes = {
            items: []
        };
        
        const result = mapper(emptyRoutes);
        expect(result).toEqual([]);
    });
    
    test('Should return array with 122 markers ', ()=> {
        
        const result = mapper(routes);
        expect(result.length).toBe(122);
    });
});
