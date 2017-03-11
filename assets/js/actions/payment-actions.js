import request from 'axios';
import * as types from '../constants/action-payment-types';

const API_URL = '/api/checkout';

export function getTodos() {
    return {
        type: 'GET_TODOS',
        promise: request.get(API_URL)
    }
}


export function editTodo(id, text) {
    return {
        type: 'EDIT_TODO',
        id,
        text,
        date: Date.now()
    };
}

export function deleteTodo(id) {
    return {
        type: 'DELETE_TODO',
        id
    };
}

export function add_checkout(paymentData) {
    return {
        type: types.ADD_CHECKOUT,
        paymentResult: paymentData
    };
}

export const checkout = (paymentData) => dispatch => {
    request.post(API_URL, {paymentData})
        .then(({ data })=> {
            dispatch(addCredentials(name, data._id, data.id, data.pic))
        })
        .catch(console.error)
};