'use strict';

import * as Constants from '../constants/action-insider-signup';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';

/**@func changeField
 * @param {String} field - field name
 * @param {String} value - field value
 * @return {Object} common action
 * */
export const changeField = (field, value) => ({
    type: Constants.CHANGE_FIELD,
    field,
    value
});

/**@func checkError
 * @param {String} field - field name
 * @param {Boolean} isValid - field value
 * @return {Object} common action
 * */
const checkError = (field, isValid) => ({
    type: Constants.CHECK_ERROR,
    field,
    isValid
});

export const submitForm = () => (dispatch, getState) => {
    let state = getState();
    
    const {name, email, city, usaState} = state.insiderSignUp.fields;
    
    dispatch(checkError('email', !isEmail(email)));
    dispatch(checkError('name', !name || !/^[a-zA-Z\s]*$/.test(name)));
    dispatch(checkError('city', city && !/^[a-zA-Z\s]*$/.test(city)));
    
    state = getState();
    
    const {errors} = state.insiderSignUp;
    
    if (!errors.name && !errors.email && !errors.city) {
        axios
            .post('/api/insider-form', {
                city, name, email, usaState
            })
            .then(response=> {
                dispatch(clearForm())
            })
            .catch(console.log)
    } else {
        dispatch(turnOnSubmission())
    }
};

const clearForm = () => ({
    type: Constants.CLEAR_FORM
});

const turnOnSubmission = () => ({
    type: Constants.TURN_ON_SUBMISSION
});