import axios from 'axios';
import * as types from '../constants/action-pages-types';

const API_URL = '/api/page';

export const loadPageData = (pageName) => dispatch => {
    axios.get(`${API_URL}/${pageName}`)
        .then(({data})=>{
            return dispatch(loadedPage(data.pages, pageName))
        })
        .catch(console.error)
};

export const loadedPage = (pages, pageName) => ({
    type: types.PAGE_LOAD,
    pages,
    pageName
});
