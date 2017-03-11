import * as Constants from '../constants/action-news-types';

export default (state = [], action) => {
    switch (action.type) {
        case Constants.NEWS_LOAD:
            return {...action.news};
        default:
            return state;
    }
}