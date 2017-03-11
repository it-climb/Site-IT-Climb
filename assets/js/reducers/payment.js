'use strict';

import * as Constants from '../constants/action-payment-types';

const defaultState = {
	id: null,
	title: '',
	top: '',
	nonMemberPrice: 0,
	memberPrice: 0,
	vipNonMemberPrice: 0,
	vipMemberPrice: 0,
	generalAdmissionParagraph: '',
	vipParagraph: '',
	bottomBanner: null
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case Constants.ADD_CHECKOUT:
			return {...state, ...action.buyTicket};
		default:
			return state;
	}
}