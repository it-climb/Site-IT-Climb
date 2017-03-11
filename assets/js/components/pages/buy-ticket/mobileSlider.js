'use strict';
import React, {Component, PropTypes} from 'react';
import Slider from "react-slick";
import {browserHistory} from 'react-router';
import Button from '../../common/button/customButton';

export default class RouteSlider extends Component {

    constructor(props) {
        super(props);
        this.handleGoTo =   this.handleGoTo.bind(this);
    }

    handleGoTo(goToPage) {
        return browserHistory && browserHistory.push.bind(browserHistory, goToPage);
    }

    render() {
        let sliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1.2,
            slidesToScroll: 1,
        };
        return (
            <Slider {...sliderSettings}>
                <div className="way">
                    <img src="/assets/images/cruise/new/chest.svg" alt="chest"/>
                    <h3 className="third-headliner">
                        Discover
                    </h3>
                    <div className="description">
                        <img src="/assets/images/cruise/new/chest.svg" alt="chest"/>
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
                <div className="way">
                    <img src="/assets/images/cruise/new/tickets.svg" alt="tickets"/>
                    <h3 className="third-headliner">
                     Show
                    </h3>
                    <div className="description">
                        <img src="/assets/images/cruise/new/tickets.svg" alt="tickets"/>
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
                <div className="way">
                    <img src="/assets/images/cruise/new/coins.svg" alt="coins"/>
                    <h3 className="third-headliner">
                        Save
                    </h3>
                    <div className="description">
                        <img src="/assets/images/cruise/new/coins.svg" alt="coins"/>
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
                <div className="way">
                    <img src="/assets/images/cruise/new/compass.svg" alt="compass" />
                    <h3 className="third-headliner">
                       Go
                    </h3>
                    <div className="description">
                        <img src="/assets/images/cruise/new/compass.svg" alt="compass" />
                        <h2 className="secondary-headliner">
                            Go
                        </h2>
                        <p className="regular-text">
                            Go hop back on board or continue exploring finding great deals around the area.
                        </p>
                        <Button className="btn btn-main btn-all-stops"
                                firstColor="#FCAD01" secondColor='#DA8B05' corner={171}
                                onClick={this.handleGoTo('/perfect-picks')}>
                            perfect picks
                        </Button>
                    </div>
                </div>
            </Slider>
        )
    }
}