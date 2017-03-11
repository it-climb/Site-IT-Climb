import _ from 'lodash';
import * as Constants from '../constants/action-blog-posts-types';

const defaultState = {
    items: [],
    total: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case Constants.BLOG_POSTS_LOAD:

            let items = [];
            if(_.isEmpty(state.items)){
                items = action.blogPosts.items;
            }else{
                ids = new Set();
                for(let item of state.items){
                    ids.add(item.id);
                }
                for(let item of action.blogPosts.items){
                    !ids.has(item.add) && items.push(item);
                }
            }

            items.sort((a,b)=>{
                return a.createdAt - b.createdAt
            });

            return {
                ...state,
                items,
                total: items.length
            };
        default:
            return state;
    }
}