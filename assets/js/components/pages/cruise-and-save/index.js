'use strict';
import React, {Component, PropTypes} from 'react';
import {Divider} from '../../common/icons/icons';
import ScrollTop from '../../../utils/ScrollTop';
import {browserHistory} from 'react-router';
import Scroll from "react-scroll";
import Button from '../../common/button/customButton';
import { ScreenDimensionWatcher } from '../../../utils/ScreenDimensionWatcher';
import RouteSlider from '../buy-ticket/mobileSlider';

class CruiseAndSaveContainer extends Component {
    constructor(props) {
        super(props);
        this.handleGoTo =   this.handleGoTo.bind(this);
        this._goToAnchor = this._goToAnchor.bind(this);
    }

    handleGoTo(goToPage) {
        return browserHistory && browserHistory.push.bind(browserHistory, goToPage);
    }


    _goToAnchor(anchor) {
        let {scroller} = Scroll;

        scroller.scrollTo(anchor, {
            duration: 500,
            delay: 100,
            smooth: true,
            offset: -80
        });
    }

    render() {

        return (
            <section className="cruise-and-save">
                <div
                    className="cruise-and-save-title"
                >
                    <h3 className="third-headliner">
                        Cruise & Save
                    </h3>
                    <Divider fillColor="#ffffff" className="divider"/>
                    <h5 className="fifth-headliner">
                       Click the icons to explore the benefits of our Cruise & Save Program.
                    </h5>
                </div>

                <section className="cruise-route">
                    {this.props.deviceType !== 'mobile'
                        ?  <ul className="list-ways-to-buy container">
                            <li className="way">
                                <img src="/assets/images/cruise/new/chest.svg" alt="chest" className="hvr-bob" onClick={this._goToAnchor.bind(this, 'discover')}/>
                                <h3 className="third-headliner">
                                    Discover
                                </h3>
                            </li>
                            <li className="way">
                                <img src="/assets/images/cruise/new/tickets.svg" alt="tickets" onClick={this._goToAnchor.bind(this, 'show')} className="hvr-bob"/>
                                <h3 className="third-headliner">
                                    Show
                                </h3>
                            </li>
                            <li className="way">
                                <img src="/assets/images/cruise/new/coins.svg" alt="coins" onClick={this._goToAnchor.bind(this, 'save')} className="hvr-bob"/>
                                <h3 className="third-headliner">
                                    Save
                                </h3>
                            </li>
                            <li className="way">
                                <img src="/assets/images/cruise/new/compass.svg" alt="compass" onClick={this._goToAnchor.bind(this, 'go')} className="hvr-bob"/>
                                <h3 className="third-headliner">
                                    Go
                                </h3>
                            </li>
                        </ul>
                        : <RouteSlider/>

                    }
                </section>

                {this.props.deviceType !== 'mobile' && <section className="cruise-online">
                    <div className="container">
                        <Scroll.Element name="discover" className="other-ways container">
                            <div className="row">
                                <div className="col-md-3 col-md-offset-1">
                                    <img src="/assets/images/cruise/new/chest.svg" alt="chest" className="save-buy hvr-bob" />
                                </div>
                                <div className="col-md-8">
                                    <div className="wrapper about">
                                        <div className="inner">
                                            <h2 className="secondary-headliner">
                                                Discover
                                            </h2>
                                            <p className="regular-text">
                                                Discover discounts at all IT Climb Cruise & Save Partner restaurants, bars, shops,
                                                attractions and boutiques with your IT Climb ticket!
                                            </p>
                                            <Button className="btn btn-main btn-all-stops"
                                                    firstColor="#FCAD01" secondColor='#DA8B05' corner={171}
                                                    onClick={this.handleGoTo('/all-it-climb-stops')}>
                                                    VIEW ALL <span> IT Climb STOPS </span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Scroll.Element>
                        <Scroll.Element name="show" className="other-ways container">
                            <div className="row">
                                <div className="col-md-3 col-md-offset-1">
                                    <img src="/assets/images/cruise/new/tickets.svg" alt="tickets" className="save-buy hvr-bob" />
                                </div>
                                <div className="col-md-8">
                                    <div className="wrapper about">
                                        <div className="inner">
                                            <h2 className="secondary-headliner">
                                                Show
                                            </h2>
                                            <p className="regular-text">
                                                Show your IT Climb ticket in restaurants, bars, shops, <br/> attractions and boutiques to
                                                <br/>
                                                recieve discounts.
                                            </p>
                                            <Button className="btn btn-main btn-buy" firstColor="#04844A" secondColor='#0A6D38'
                                                    corner={166} onClick={this.handleGoTo('/buy-ticket')}>
                                                Buy tickets <span className="btn-circle">&#62;</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Scroll.Element>
                        <Scroll.Element name="save" className="other-ways container">
                            <div className="row">
                                <div className="col-md-3 col-md-offset-1 col-xs-12">
                                    <img src="/assets/images/cruise/new/coins.svg" alt="save" className="save-buy hvr-bob" />
                                </div>
                                <div className="col-md-8">
                                    <div className="wrapper about">
                                        <div className="inner">
                                            <h2 className="secondary-headliner">
                                                Save
                                            </h2>
                                            <p className="regular-text">
                                                Save on Free Appetizers, 2 for 1 Specials and Happy Hour discounts to savings at <br/>
                                                many attractions, sports rental shops and fashion boutiques throughout Fort <br/>
                                                Lauderdale and Hollywood, Florida. <br/>
                                            </p>
                                            <div className="save-box">
                                                <img src="/assets/images/cruise/box_no_animate.svg" alt="box"/>
                                                <span className="regular-text">Just look out for the treasure chest icon to see deals for that stop.</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Scroll.Element>
                        <Scroll.Element name="go" className="other-ways container">
                            <div className="row">
                                <div className="col-md-3 col-md-offset-1">
                                    <img src="/assets/images/cruise/new/compass.svg" alt="compass" className="save-buy hvr-bob" />
                                </div>
                                <div className="col-md-8">
                                    <div className="wrapper about">
                                        <div className="inner">
                                            <h2 className="secondary-headliner">
                                                Go
                                            </h2>
                                            <p className="regular-text">
                                                Go hop back on board or continue exploring finding great deals around the area.
                                            </p>
                                            <Button className="btn btn-main btn-perfect"
                                                    firstColor="#FCAD01" secondColor='#DA8B05' corner={171}
                                                    onClick={this.handleGoTo('/perfect-picks')}>
                                                perfect picks
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Scroll.Element>
                    </div>
                </section>
                }
            </section>
        )
    }
}

export default ScrollTop(ScreenDimensionWatcher(CruiseAndSaveContainer));