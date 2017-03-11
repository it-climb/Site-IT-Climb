'use strict';

import React, { Component, PropTypes } from 'react';
import OrderTickets from '../../common/orderTickets/orderTickets';
import SignUp from '../../common/signUpForm/signUpForm';
import ScrollTop from '../../../utils/ScrollTop';
import { ScreenDimensionWatcher } from "../../../utils/ScreenDimensionWatcher";

class GetMoreLauderdaleContainer extends Component {
    
    render() {
        return (
            <section className="more-lauderdale">
                <div className="wrapper lauderdale-preheader">
                    <div className="inner">
                        <h2 className="secondary-headliner">
                            Get More Lauderdale
                        </h2>
                        <h3 className="fourth-headliner">
                            More Lauderdale allows you to share & stream photos or videos straight to our <span>website while you’re on the boat.</span>
                        </h3>
                    </div>
                </div>
                <section className="places">
                    <ul className="list-of-places">
                        <li className="item-place">
                            <img src="/assets/images/home/place-1.png" alt="place"
                                 srcSet="/assets/images/home/place-1.png 1x, /assets/images/home/place-1@2x.png 2x" className="img-responsive"/>
                        </li>
                        <li className="item-place">
                            <div className="wrapper">
                                <div className="inner">
                                    <a href="/" className="social-link instagram"/>
                                    <div className="instagram-text-info">
                                        <h3 className="third-headliner">
                                            #MoreLauderdale
                                        </h3>
                                        <p className="regular-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ele ifend leo
                                            vitae dolor ullamcorper tempus. Maecenas ac faucibus nis lor ullamcorper
                                            tem.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="item-place">
                            <img src="/assets/images/home/place-2.png" alt="place"
                                 srcSet="/assets/images/home/place-2.png 1x, /assets/images/home/place-2@2x.png 2x" className="img-responsive"/>
                        </li>
                        <li className="item-place">
                            <div className="wrapper">
                                <div className="inner">
                                    <a href="/" className="social-link instagram"/>
                                    <div className="instagram-text-info">
                                        <h3 className="third-headliner">
                                            #MoreLauderdale
                                        </h3>
                                        <p className="regular-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ele ifend leo
                                            vitae dolor ullamcorper tempus. Maecenas ac faucibus nis lor ullamcorper
                                            tem.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </li>
                        <li className="item-place">
                            <img src={this.props.deviceType === 'mobile' ? '/assets/images/home/place-3_mobile.png': '/assets/images/home/place-3.png'} alt="place"
                                 srcSet={this.props.deviceType === 'mobile'
                                     ? '/assets/images/home/place-3_mobile.png 1x, /assets/images/home/place-3_mobile@2x.png 2x'
                                     : '/assets/images/home/place-3.png 1x, /assets/images/home/place-3@2x.png 2x'}
                                 className="img-responsive"/>
                        </li>
                        {this.props.deviceType === 'mobile' &&
                        <li className="item-place">
                            <div className="wrapper">
                                <div className="inner">
                                    <a href="/" className="social-link instagram"/>
                                    <div className="instagram-text-info">
                                        <h3 className="third-headliner">
                                            #MoreLauderdale
                                        </h3>
                                        <p className="regular-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ele ifend leo
                                            vitae dolor ullamcorper tempus. Maecenas ac faucibus nis lor ullamcorper
                                            tem.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </li>}
                    </ul>
                    <ul className="list-of-places second-part">
                        <li className="item-place">
                            <img src="/assets/images/home/bride-girls.png" alt="place"
                                 srcSet="/assets/images/home/bride-girls.png 1x,/assets/images/home/bride-girls@2x.png 2x" className="img-responsive"/>
                        </li>
                        <li className="item-place">
                            <div className="wrapper">
                                <div className="inner">
                                    <a href="/" className="social-link instagram"/>
                                    <div className="instagram-text-info">
                                        <h3 className="third-headliner">
                                            #MoreLauderdale
                                        </h3>
                                        <p className="regular-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ele ifend leo
                                            vitae dolor ullamcorper tempus. Maecenas ac faucibus nis lor ullamcorper
                                            tem.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="item-place">
                            <img src="/assets/images/home/some-place" alt="place"
                                 srcSet="/assets/images/home/some-place.png 1x, /assets/images/home/some-place@2x.png 2x" className="img-responsive"/>
                        </li>
                        <li className="item-place">
                            <div className="wrapper">
                                <div className="inner">
                                    <a href="/" className="social-link instagram"/>
                                    <div className="instagram-text-info">
                                        <h3 className="third-headliner">
                                            #MoreLauderdale
                                        </h3>
                                        <p className="regular-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ele ifend leo
                                            vitae dolor ullamcorper tempus. Maecenas ac faucibus nis lor ullamcorper
                                            tem.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </li>
                        <li className="item-place">
                            <img src="/assets/images/home/pirate-republic.png" alt="place"
                                 srcSet="/assets/images/home/pirate-republic.png 1x, /assets/images/home/pirate-republic@2x.png 2x"
                                 className="img-responsive"/>
                        </li>
                    </ul>
                </section>
                <OrderTickets />
                <SignUp />
            </section>
        )
    }
}

export default  ScreenDimensionWatcher(ScrollTop(GetMoreLauderdaleContainer))