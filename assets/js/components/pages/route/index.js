'use strict';
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { loadRoutesPageData } from '../../../actions/routes-actions';
import { bindActionCreators } from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import { connect } from 'react-redux';
import {Divider} from '../../common/icons/icons';
import {Counter} from '../../common/counter/counter';
import {Link} from 'react-router';
import Button from '../../common/button/customButton';
import OrderTickets from '../../common/orderTickets/orderTickets';
import SignUp from '../../common/signUpForm/signUpForm';
import RouteItem from '../../entities/routes/route-item/route-item';
import dataUtils from '../../../utils/data_utils';
import Stop from './stop';
import AutoAffix from 'react-overlays/lib/AutoAffix';
import RoutePagination from '../../entities/routes/route-pagination/route-pagination';
import Lightbox from './../all-it-climb-stops/lightbox';


class RouteContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            showLightBox: false
        };
        this._renderLightboxPlace = this._renderLightboxPlace.bind(this);
        this.handleShowPlace = this.handleShowPlace.bind(this);
    }

    componentDidMount(){
        this.props.loadRoutesPageData(this.props.params.slug);
    }
    handleShowPlace(place) {
        this.setState({
            showLightBox: true,
            place: place
        })
    }

    _renderLightboxPlace() {
        let {place} = this.state;
        return <Lightbox place={place}
                         onClick={this.setState.bind(this, {showLightBox: !this.state.showLightBox}, void(0))}/>
    }

    render() {

        let routes = _.get(this.props, 'routes', {}),
            singleRoute = routes.current,
            {next} = routes,
            {previous} = routes;

        return (
            <section className="single-route">
                {this.state.showLightBox && this._renderLightboxPlace()}
                <div className="picks-banner wrapper">
                    <div className="inner">
                        <img src={_.isEmpty(_.get(singleRoute, 'icon.url', ''))?'/assets/images/MapIcons/icn_boat_pad.svg': _.get(singleRoute, 'icon.url', '')} alt="" className="icon"/>
                        <h3 className="third-headliner">
                            {_.get(singleRoute, 'title', 'StopName')}
                        </h3>
                        <Divider fillColor="#ffffff" className="divider"/>
                        <Counter caption="Routes" time={2000} begin={0} end={6}/>
                        <Counter caption="Things to see" time={2000} begin={0} end={600}/>
                        <Counter caption="Smiles" time={2000} begin={0} end={500}/>
                    </div>
                </div>
                <div className="container">
                    <div className="wrapper preheader-info">
                        <div className="inner">
                            <h5 className="fifth-headliner">
                                Our experts do the thinking so you don’t have too.
                            </h5>
                            <p className="regular-text">
                                IT Climb welcomes you to Fort Lauderdale! The best way to see this beautiful city is
                                on a IT Climb Tour. IT Climb Tours super<br/>
                                are the best combination of tours and transportation in Fort Lauderdale and Hollywood
                                Florida. So if you are looking for things to<br/>
                                do in Fort Lauderdale or Hollywood, Florida this summer, you are in the right
                                place.<br/>
                            </p>
                        </div>
                    </div>
                </div>
                <AutoAffix viewportOffsetTop={53} container={this}>
                <div className="single-route-header">
                    <div className="container">
                        <img src={_.isEmpty(_.get(singleRoute, 'icon.url', ''))?'/assets/images/MapIcons/icn_boat_pad.svg': _.get(singleRoute, 'icon.url', '')} alt="" className="icon"/>
                        <h2 className="secondary-headliner">
                            {_.get(singleRoute, 'title', 'StopName')}
                        </h2>
                        <h3 className="third-headliner">{_.get(singleRoute, 'title', 'StopName')}</h3>
                    </div>
                </div>
                </AutoAffix>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-offset-2 col-sm-8 col-xs-offset-3 col-xs-9  route-line">
                            {_.get(singleRoute, 'stops', []).map((stop)=><Stop key={stop.id} stop={stop} handleShowPlace={this.handleShowPlace}/>)}
                        </div>
                    </div>
                </div>
                <OrderTickets />
                <SignUp />

            </section>
        )
    }
}


const mapStateToProps = state => ({
    routes: state.routes
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadRoutesPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(RouteContainer))
