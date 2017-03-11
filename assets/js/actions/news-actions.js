import axios from 'axios';
import * as types from '../constants/action-news-types';

const API_URL = '/api/news';

export const loadNewsPageData = () => dispatch => {
    axios.get(API_URL)
        .then(({ data })=>dispatch(loadedNews(data.news)))
        .catch(console.error)
};

export const loadedNews = (news) => ({
    type: types.NEWS_LOAD,
    news
});
