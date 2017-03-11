import React, { Component, PropTypes } from 'react';
import Checkout from '../components/payment/form/checkout';

class Payment extends Component {

    render () {
        return (
            <div>
                <h1>Payment</h1>
                <Checkout checkoutAction/>
            </div>
        );
    }
}


export default Payment;