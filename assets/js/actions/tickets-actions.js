import axios from 'axios';
import * as types from '../constants/action-tickets-types';

const API_URL = '/api/tickets';

export const loadTicketsPageData = () => dispatch => {
    axios.get(API_URL)
        .then(({ data })=>dispatch(loadedTickets(data.tickets)))
        .catch(console.error)
};

export const loadedTickets = (tickets) => ({
    type: types.TICKETS_LOAD,
    tickets
});
