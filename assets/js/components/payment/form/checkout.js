import React from 'react';
import LazyInput from 'lazy-input';
import MaskedInput from 'react-maskedinput';
import Errors from '../../common/errors/errors';
import commonUtils from '../../../utils/common_utils';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {checkout} from '../../../actions/payment-actions';
import ScrollTop from '../../../utils/ScrollTop';

class Checkout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cardName: '',
            cardNumber: '',
            cardCVV: '',
            cardExpirationDate: '',
            errors: {}
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);

    }

    _hasValidationErrors(creditCardData) {
            let hasErrors = false;

            if (_.isEmpty(creditCardData.name)) {
                hasErrors = true;
                commonUtils.errorHandler('Name on the card is required', 'checkout.cardName', this);
            }

            if (_.isEmpty(creditCardData.number)) {
                hasErrors = true;
                commonUtils.errorHandler('Credit card number is required', 'checkout.number', this);
            }

            if (_.isEmpty(creditCardData.cvc)) {
                hasErrors = true;
                commonUtils.errorHandler('cvc is required', 'checkout.cvc', this);
            }

            if (_.isEmpty(creditCardData.exp_month) || _.isEmpty(creditCardData.exp_year)) {
                hasErrors = true;
                commonUtils.errorHandler('Expiration date is required', 'checkout.exp_date', this);
            }
            return hasErrors;
        }


    _handleSubmit(ev) {
        ev.preventDefault();
        let $this = this;
        this.setState({errors: {}}, () => {

            let creditCardData = {
                name: $this.state.cardName,
                number: $this.state.cardNumber,
                cvc: $this.state.cardCVV,
                exp_month: $this.state.cardExpirationDate.split('/')[0],
                exp_year: $this.state.cardExpirationDate.split('/')[1],
            };

            let hasError = this._hasValidationErrors(creditCardData);
            if (hasError) {
                return;
            }

            Stripe.card.createToken(creditCardData, (status, response) => {
                console.log('response', response);
                if (response.error) {
                    console.log('response.error', response.error);
                    commonUtils.errorHandler(response.error.message, `checkout.${response.error.param}`, $this);
                    //window.scrollTo(0, 0);
                } else {
                    let token = response.id,
                        checkoutData = {
                            ticketId: '57d957971b539aaf5e4f404e',
                            stripeToken: token,
                            amount: 100//dollars
                        };


                    //hide 'subscriptions' functionality
                    //PaymentActions[isSubscription ? 'subscribeAsync' : 'checkoutAsync'](checkoutData, {})

                    /*
                    PaymentActions.checkoutAsync(checkoutData, {})
                        .then(donation => {
                            let donationId = donation.paymentTransactionId || donation.paymentSubscriptionId,
                                forceStateRender = _.now();
                            AppStateAction.update({cart: {}, forceStateRender});
                            browserHistory.push(`/checkout/success/${normalizedName}/${donationId}`);
                        })
                        .catch(error => {
                            commonUtils.errorHandler(error, 'checkout', $this);
                            window.scrollTo(0, 0);
                        });
                    */

                    console.log('checkoutData', checkoutData);

                    $this.props.checkout(checkoutData);

                }
            });
        });
    }

    _handleChange(ev){
        let input = ev.target,
            value = input.type == 'checkbox' ? input.checked : input.value;
        this.setState({[input.name]: value, shippingRate: -1});
    }

    render(){
        let {state} = this;
        return (
            <div>
                <p>Payment form</p>
                <form action="" method="post" className="guest-checkout-form row" onSubmit={this._handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label className="form-label lock">Enter the name on the card</label>
                        <LazyInput type="text" name="cardName"
                                   onChange={this._handleChange}
                                   className="form-control"/>
                        <Errors errors={_.get(this.state, 'errors.checkout.cardName', {})}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label lock">enter your credit card number</label>
                        <MaskedInput mask="1111 1111 1111 1111" name="cardNumber" size="20"
                                     onChange={this._handleChange}
                                     className="form-control"/>
                        <Errors errors={_.get(this.state, 'errors.checkout.number', {})}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label lock">enter the ccv number</label>
                        <MaskedInput mask="111" name="cardCVV" onChange={this._handleChange.bind(this)}
                                     className="form-control"/>
                        <Errors errors={_.get(this.state, 'errors.checkout.cvc', {})}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label lock">enter the expiration date</label>
                        <MaskedInput mask="11/1111" name="cardExpirationDate" placeholder="mm/yyyy"
                                     onChange={this._handleChange.bind(this)}
                                     className="form-control"/>
                        <Errors errors={_.get(this.state, 'errors.checkout.card[exp_year]', {})}/>
                        <Errors errors={_.get(this.state, 'errors.checkout.exp_year', {})}/>
                        <Errors errors={_.get(this.state, 'errors.checkout.exp_month', {})}/>
                        <Errors errors={_.get(this.state, 'errors.checkout.exp_date', {})}/>
                    </div>
                    <input type="submit" className="btn btn-simple center-block"
                           value={'COMPLETE PURCHASE'}/>
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = () => dispatch => bindActionCreators({ checkout }, dispatch);

const mapStateToProps = state => ({
    credentials: state.credentials
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(Checkout))