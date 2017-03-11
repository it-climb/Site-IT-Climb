'use strict';
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {loadRoutesPageData} from '../../../actions/routes-actions';
import {bindActionCreators} from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import {connect} from 'react-redux';
import {Divider} from '../../common/icons/icons';
import {Counter} from '../../common/counter/counter';
import OrderTickets from '../../common/orderTickets/orderTickets';
import SignUp from '../../common/signUpForm/signUpForm';
import Stop from './stop';
import Filters from '../../common/filter';
import Lightbox from './lightbox';
import Button from '../../common/button/customButton';

class AllStopsContainer extends Component {

    componentDidMount() {
        this.props.loadRoutesPageData();
    }

    render() {
        if (this.props.routes.filteredItemsWithoutStops.length == 0) return null;
        
        return (<AllStops {...this.props}/>)
    }
}

class AllStops extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            showFilters: false,
            showLightBox: false
        };
        this._renderLightboxPlace = this._renderLightboxPlace.bind(this);
        this.handleShowPlace = this.handleShowPlace.bind(this);
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
        return (
            <section className="all-stops">
                {this.state.showLightBox && this._renderLightboxPlace()}
                <div className="all-stops-preheader wrapper">
                    <div className="inner">
                        <h3 className="third-headliner">
                            All IT Climb stops
                        </h3>
                        <Divider fillColor="#ffffff" className="divider"/>
                        <Counter caption="Routes" time={2000} begin={0} end={this.props.routes.items.length}/>
                        <Counter caption="Stops" time={2000} begin={0} end={this.props.allStops.length}/>
                        <Counter caption="Smiles" time={2000} begin={0} end={500}/>
                    </div>
                </div>
                <div className="container">
                    <div className="wrapper preheader-info">
                        <div className="inner">
                            <h5 className="fifth-headliner">
                                Scroll down and start exploring to see what all of our stops have to offer!
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
                <div className="container">
                    <Button className="btn btn-main btn-activity" firstColor="#F9F9F9" secondColor='#EFEFEF' corner={156}
                            onClick={()=>this.setState({showFilters: !this.state.showFilters})}>
                        Filters
                    </Button>
                </div>
                <div className={this.state.showFilters ?'filters  show-filters container' :'filters container'}>
                    <Filters/>
                </div>
                {_.sortBy(_.get(this.props, 'routes.filteredItemsWithoutStops', []), ['index']).map((route)=> {
                    let color = route.color;
                    return route.stops.filter((stop)=>stop.places.length !=0).map((stop, index)=><Stop key={index} stop={stop} color={color} handleShowPlace={this.handleShowPlace}/>)
                })}
                <OrderTickets/>
                <SignUp/>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    routes: state.routes,
    allStops: state.routes.allStops,
    allPlaces: state.routes.allPlaces
});

const mapDispatchToProps = dispatch => bindActionCreators({loadRoutesPageData}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(AllStopsContainer))
