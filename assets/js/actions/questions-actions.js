import axios from 'axios';
import * as types from '../constants/action-questions-types';

const API_URL = '/api/questions';

export const loadQuestionsPageData = () => dispatch => {
    axios.get(API_URL)
        .then(({ data })=>dispatch(loadedQuestions(data.questions)))
        .catch(console.error)
};

export const loadedQuestions = (questions) => ({
    type: types.QUESTIONS_LOAD,
    questions
});
