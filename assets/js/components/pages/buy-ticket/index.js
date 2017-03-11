'use strict';
import React, {Component, PropTypes} from 'react';
import Button from '../../common/button/customButton';
import CheckoutRow from './checkout_row/checkout_row';
import Scroll from 'react-scroll';
import {Link} from 'react-router';
import SignUp from '../../common/signUpForm/signUpForm';
import ScrollTop from '../../../utils/ScrollTop';
import { loadTicketsPageData } from '../../../actions/tickets-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dataUtils from '../../../utils/data_utils';
import _ from 'lodash';
import { ScreenDimensionWatcher } from '../../../utils/ScreenDimensionWatcher';
import RouteSlider from './mobileSlider';
class BuyTicketContainer extends Component {

    constructor(props) {
        super(props);
        this._handleSubmitSignUp = this._handleSubmitSignUp.bind(this);
        this._handleScrollToAnchor =this._handleScrollToAnchor.bind(this);
    }

    componentDidMount() {
        this.props.loadTicketsPageData();
    }

    _handleScrollToAnchor() {
        let {scroller} = Scroll;
        scroller.scrollTo('info', {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -80
        })
    }

    _handleSubmitSignUp(){
        console.log('You did it');
    }

    render() {

        let tickets = dataUtils.getItemsArrayFromStore(_.get(this.props, 'tickets', []))
            .sort((a, b)=>new Date(a.createdAt)-new Date(b.createdAt))
            .map((ticket)=> {
                return (
                    <CheckoutRow
                        title={ticket.title}
                        description={ticket.shortDescription}
                        discountPrice={ticket.discountPrice}
                        discountDescription={ticket.discountDescription}
                        regularPrice={ticket.price}/>
                )
            });

        return (
            <div className="tickets">
                <section className="buy-tickets">
                    <h1 className="first-headliner">
                        There are four convenient <span>ways to buy your ticket</span>
                    </h1>
                </section>
                <section className="buy-route">
                    {this.props.deviceType !== 'mobile'
                        ?  <ul className="list-ways-to-buy container">
                        <li className="way">
                            <img src="/assets/images/buy_tickets/icn_laptop_pad.svg" alt="laptop" className="hvr-bob"/>
                            <h3 className="third-headliner">
                                Save Now <span>& Buy Online</span>
                            </h3>
                        </li>
                        <li className="way">
                            <img src="/assets/images/buy_tickets/icn_boat_pad.svg" alt="boat" onClick={this._handleScrollToAnchor} className="hvr-bob"/>
                            <h3 className="third-headliner">
                                Purchase On Board <span>Any IT Climb</span>
                            </h3>
                        </li>
                        <li className="way">
                            <img src="/assets/images/buy_tickets/icn_case_pad.svg" alt="case" onClick={this._handleScrollToAnchor} className="hvr-bob"/>
                            <h3 className="third-headliner">
                                Purchase at Hotel <span>or Restaurant</span>
                            </h3>
                        </li>
                        <li className="way">
                            <img src="/assets/images/buy_tickets/icn_tower_pad.svg" alt="online" onClick={this._handleScrollToAnchor} className="hvr-bob"/>
                            <h3 className="third-headliner">
                                Buy at Las Olas <span>Riverside garage</span>
                            </h3>
                        </li>
                    </ul>
                        : <RouteSlider/>

                    }
                </section>
                <section className="buy-online">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-md-offset-1">
                                <img src="/assets/images/buy_tickets/icn_laptop_pad.svg" alt="laptop" className="save-buy hvr-bob" />
                            </div>
                            <div className="col-md-8">
                                <div className="wrapper about">
                                    <div className="inner">
                                        <h2 className="secondary-headliner">
                                            Save Now & Buy Online
                                        </h2>
                                        <p className="regular-text">
                                            Lorem ipsum dolor sit amet, conse ctetur adipiscing elit. Proin eleifend leo
                                            vitae
                                            dolor ullamcorper tempus. Lorem ipsum dolor sit amet, conse ctetur
                                            adipiscing elit.
                                            Proin eleifend leo vitae dolor ullamcorper tempus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="checkout-table container">
                    <div className="wrapper checkout-table-header">
                        <div className="inner">
                            <h2 className="fourth-headliner">
                                Your IT Climb Ticket includes&nbsp;<span>Unlimited</span>&nbsp;rides&nbsp;<span>All Day</span>&nbsp;
                                in Fort Lauderdale & Hollywood.
                            </h2>
                        </div>
                    </div>
                    {tickets}
                    <div className="checkout-table-footer">
                        <Link to="/terms" className="terms-conditions">
                            See Terms & Conditions for all
                        </Link>
                        <Button className="btn btn-main btn-checkout" firstColor="#04844A" secondColor='#0A6D38'
                                onClick={()=>window.location.href = 'https://store.ItClimb.com/WebStore/shop/ViewItems.aspx?CG=FLWT&C=WT'}
                                corner={166}>CHECK OUT</Button>
                    </div>
                </section>
                <Scroll.Element name="info" className="other-ways container">
                    <ul className="ways">
                        <li className="way">
                            <img src="/assets/images/buy_tickets/icn_boat_pad.svg" alt="boat" className="hvr-bob"/>
                            <h3 className="third-headliner">
                                Purchase On Board <span>Any IT Climb</span>
                            </h3>
                            <p className="regular-text">
                                Lorem ipsum dolor sit amet, conse
                                ctetur adipiscing elit. Proin eleifend
                                leo vitae dolor ullamcorper tempus
                            </p>
                        </li>
                        <li className="way">
                            <img src="/assets/images/buy_tickets/icn_case_pad.svg" alt="case" className="hvr-bob"/>
                            <h3 className="third-headliner">
                                Purchase at Hotel <span>or Restaurant</span>
                            </h3>
                            <p className="regular-text">
                                Lorem ipsum dolor sit amet, conse
                                ctetur adipiscing elit. Proin eleifend
                                leo vitae dolor ullamcorper tempus
                            </p>
                        </li>
                        <li className="way">
                            <img src="/assets/images/buy_tickets/icn_tower_pad.svg" alt="online" className="hvr-bob"/>
                            <h3 className="third-headliner">
                                Buy at Las Olas <span>Riverside garage</span>
                            </h3>
                            <p className="regular-text">
                                Lorem ipsum dolor sit amet, conse
                                ctetur adipiscing elit. Proin eleifend
                                leo vitae dolor ullamcorper tempus
                            </p>
                        </li>
                    </ul>
                </Scroll.Element>
                <section className="disclaimers container">
                    <div className="row">
                        <div className="col-md-10">
                            <p className="disclaimer regular-text">
                                Tickets can be used on a date of your choosing up to one year from the date of purchase after which they expire and cannot be redeemed.
                            </p>
                            <p className="disclaimer regular-text">
                                Board the IT Climb at any one of 20 locations in Fort Lauderdale or Hollywood and present your online voucher to the crew, they will exchange
                                it for a ticket.
                            </p>
                            <p className="disclaimer regular-text">
                                IT Climb Tickets MUST be printed and brought with you on the day of your departure. Tickets are made available to print at the end of your
                                purchase via a PDF. Please call 954-467-6677 if you have any questions.
                            </p>
                            <p className="disclaimer regular-text">
                                Please note blackout dates include Christmas, The Winterfest Boat Parade (Dec.10), Fort Lauderdale International Boat Show (Nov. 3rd-7th)
                                where regular IT Climb service will be suspended.
                            </p>
                            <p className="disclaimer regular-text">
                                IT Climb Tickets are not redeemable, refundable, or transferable.
                            </p>
                            <p className="disclaimer regular-text">
                                Damaged or illegible tickets are invalid and will not be replaced by IT Climb or its authorized distributors.
                            </p>
                            <p className="disclaimer regular-text">
                                Crew members are permitted to accept gratuities. If you enjoyed your trip, please consider leaving a tip to show your appreciation.
                            </p>
                            <p className="disclaimer regular-text">
                                US Coast Guard Regulations limit our boat’s maximum capacity. Seating is subject to availability.
                            </p>
                        </div>
                    </div>
                </section>
                <SignUp signUp={this._handleSubmitSignUp}/>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        tickets: state.tickets
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({ loadTicketsPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(ScreenDimensionWatcher(BuyTicketContainer)))