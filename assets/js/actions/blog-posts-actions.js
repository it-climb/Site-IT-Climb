import axios from 'axios';
import * as types from '../constants/action-blog-posts-types';

const API_URL = '/api/blog-posts';

export const loadBlogPostsPageData = (date) => dispatch => {
    axios.get(API_URL, {params: {date : date}})
        .then(({ data })=>dispatch(loadedBlogPosts(data)))
        .catch(console.error);
};

export const loadBlogPostById = (id) => dispatch => {
    axios.get(API_URL, {params: {slug: id}})
        .then(({ data })=>dispatch(loadedBlogPosts(data)))
        .catch(console.error);
};

export const loadedBlogPosts = (blogPosts) => ({
    type: types.BLOG_POSTS_LOAD,
    blogPosts
});
