import _ from 'lodash';
import * as Constants from '../constants/action-pages-types';

const defaultState = {
    items: [],
    current: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case Constants.PAGE_LOAD:
            return {
                items: action.pages,
                current: _.get(action.pages.filter((page)=>page.name===action.pageName), '[0]', null)
            };
        default:
            return state;
    }
}