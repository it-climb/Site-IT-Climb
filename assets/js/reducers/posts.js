import * as Constants from '../constants/action-posts-types';

const defaultState = {
    items: [],
    total: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case Constants.POSTS_LOAD:
            return {
                ...state,
                items: action.latest ? action.items : state.items.concat(action.items),
                total: action.total
            };
        case Constants.ADD_POST:
            return {
                items: [action.post, ...state.items],
                total: state.total + 1
            };
        case Constants.UPDATE_JUST_CREATED_POST:
            return {
                ...state,
                items: state.items.map(post=>
                    post._id === action.tempId
                        ?
                        action.post
                        :
                        post
                )
            };
        default:
            return state;
    }
}