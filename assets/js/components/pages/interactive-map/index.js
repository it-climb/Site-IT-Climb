'use strict';
import React, {Component, PropTypes} from 'react';
import Map from '../../common/map/index';
import Filters from '../../common/filter';
import {loadRoutesPageData, routeChosen} from '../../../actions/routes-actions';
import {bindActionCreators} from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import {connect} from 'react-redux';
import Stop from './stop';
import StopM from './stop-mobile';
import RoutePagination from '../../entities/routes/route-pagination/route-pagination';
import _ from 'lodash';
import Lightbox from './lightbox';
import { ScreenDimensionWatcher } from '../../../utils/ScreenDimensionWatcher';
import Slider from 'react-slick';
import Button from '../../common/button/customButton';
import {animateScroll} from 'react-scroll';

class InteractiveMapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showFilters: false,
            showLightBox: false,
            centeredMarker: {},
            isStop:false
        };
        this.renderStopSlider = this.renderStopSlider.bind(this);
        this._renderLightboxPlace = this._renderLightboxPlace.bind(this);
        this.handleShowPlace = this.handleShowPlace.bind(this);
        this._handleCurrentStop = this._handleCurrentStop.bind(this);
        this._handleChangeRoute = this._handleChangeRoute.bind(this);
    }

    componentWillMount() {
        this.props.loadRoutesPageData('fort-lauderdale-mansion-and-marina-tour');
    }

    handleShowPlace(place) {
        this.props.deviceType === 'mobile' && animateScroll.scrollToTop();
        let placeLocation = _.get(place, 'location', {});
        this.setState({
            centeredMarker:placeLocation,
            showLightBox: true,
            place: place,
            isStop: false
        })
    }

    _handleCurrentStop(index, singleRoute = _.get(this.props.routes, 'current', {})) {
        let stopLocation = _.get(singleRoute, `stops[${index}].location`, {});
        this.setState({
            centeredMarker: stopLocation,
            isStop: true
        });
    }

    _handleChangeRoute(route) {
        this._handleCurrentStop(0, route);
        this.props.routeChosen(route.slug);
    }

    renderStopSlider(stops) {
        const sliderSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            className: 'main-slider',
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: false,
            swipeToSlide: false,
            afterChange: this._handleCurrentStop
        };
        return !_.isEmpty(stops) && <Slider {...sliderSettings}>
                {stops.length > 0 ?
                    stops.map((stop)=>
                        <div
                            key={stop.id}
                            className="single-stop"
                        >
                            {stop}
                        </div>)
                    :
                    <div></div>
                }
            </Slider>
    }

    _renderLightboxPlace() {
        let {place} = this.state;
        return <Lightbox place={place}
                         onClick={this.setState.bind(this, {showLightBox: !this.state.showLightBox}, void(0))}/>
    }

    render() {
        let {routes} = this.props,
            singleRoute = _.get(routes, 'filteredCurrent', {}),
            routeColor = _.get(singleRoute, 'color', ''),
            amountStops = _.get(singleRoute, 'stops', []).length - 1,
            {next} = routes,
            {previous} = routes,
            stops = _.get(singleRoute, 'stops', [])
                .filter((stop)=>stop.places.length != 0)
                .map((stop, index)=><Stop className={amountStops == index ? 'stop-container last': 'stop-container'} key={stop.id} stop={stop} color={routeColor} index={index}
                                   handleShowPlace={this.handleShowPlace} handleCurrentStop={this._handleCurrentStop}/>),
            stopsM = _.get(singleRoute, 'stops', [])
                .filter((stop)=>stop.places.length != 0)
                .map((stop)=><StopM key={stop.id} stop={stop} color={routeColor}
                                   handleShowPlace={this.handleShowPlace}/>);

        return this.props.deviceType === 'mobile'
            ? <section className="interactive-map mobile-view">
            {this.state.showLightBox && this._renderLightboxPlace()}
            <Map
                className="route-map"
                routes={routes}
                centeredMarker = {this.state.centeredMarker}
            />
            <div className="filter-section wrapper">
                <div className="inner">
                    <img src="/assets/images/icn_logo.svg" className="logo" alt="logo"/>
                    <span className="click-there"
                          onClick={()=>this.setState({showFilters: !this.state.showFilters})}>Click to {this.state.showFilters ? 'hide' : 'view'}
                        &nbsp;filters</span>
                </div>
            </div>
            <div className={this.state.showFilters ? 'filters  show-filters container' : 'filters container'}>
                <Filters/>
            </div>
            {stops.length > 0 ? this.renderStopSlider(stopsM) : <div className="empty_slider"/>}
            {next && previous && <RoutePagination next={next} previous={previous} callback={this._handleChangeRoute} />}
        </section>

            : <section className="interactive-map desktop-view">
                <div className="left-nav-side" ref="container">
                    <Button className="btn btn-main btn-activity" firstColor="#F9F9F9" secondColor='#EFEFEF' corner={156}
                            onClick={()=>this.setState({showFilters: !this.state.showFilters})}>
                        Filters
                    </Button>
                    <p className="description-text">Filter your list of places</p>
                    <div className={this.state.showFilters ? 'filters  show-filters container' : 'filters container'}>
                        <Filters/>
                    </div>
                    {stops.length > 0 && stops}
                    {next && previous &&
                    <RoutePagination next={next} previous={previous} callback={this._handleChangeRoute}/>}
                </div>
                {this.state.showLightBox && this._renderLightboxPlace()}
                <Map
                    className="route-map"
                    routes={routes}
                    centeredMarker={this.state.centeredMarker}
                    isStop = {this.state.isStop}
                />
            </section>
    }
}

const mapStateToProps = state => ({
    routes: state.routes,
});

const mapDispatchToProps = dispatch => bindActionCreators({loadRoutesPageData, routeChosen}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(ScreenDimensionWatcher(InteractiveMapContainer)))
