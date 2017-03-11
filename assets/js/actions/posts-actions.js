import axios from 'axios';
import * as types from '../constants/action-posts-types';

const API_URL = '/api/posts';

export const loadPostsPageData = () => dispatch => {
    axios.get(API_URL)
        .then(({ data })=>dispatch(loadedPosts(data.posts)))
        .catch(console.log)
};

export const loadedPosts = (post) => ({
    type: types.POSTS_LOAD,
    post
});

export const createPost = (comment, name, email, tempId) => dispatch => {

    let post = {
        id: tempId,
        comment,
        createdAt: Date.now(),
        email
    };

    dispatch(addPost(post));

    axios.post(`/post`, post)
        .then(({ data })=>dispatch(updateJustCreatedPost(tempId, data)))
        .catch(err=> {
            console.log(err)
        })
};

export const addPost = (post) => ({
    type: types.ADD_POST,
    post
});

export const updateJustCreatedPost = (tempId, post) => ({
    type: types.UPDATE_JUST_CREATED_POST,
    tempId,
    post
});
