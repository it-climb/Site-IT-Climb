'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import Place from './place';
import {connect} from 'react-redux';
import favouritePlacesUtils from '../../../utils/favourite_places_utils';
import AutoAffix from 'react-overlays/lib/AutoAffix';
import {MY_FAVOURITES} from '../../../constants/index';

class Stop extends Component {

    static propTypes = {
        stop: PropTypes.object,
        color: PropTypes.string,
        handleShowPlace: PropTypes.func,
        handleCurrentStop:PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            favoritePlaces: [],
            toggleClass: false
        };
    }

    _handleShowPlace(place) {
        this.props.handleShowPlace(place);
    }

    render() {
        let stopColor,
            favouritePlaces = Array.from(this.props.favouritePlaces.set),
            {stop, color, currentFilters, index} = this.props,
            filteredPlaces = _.isEmpty(currentFilters) ? stop.places : stop.places
                .filter((place)=> {
                    return !_.isEmpty((_.intersection(currentFilters, place.type))) || (_.includes(currentFilters, MY_FAVOURITES) && (!_.isEmpty(_.intersection(favouritePlaces, [place.id]))))
                });
        switch (color) {
            case '#efa73c':
                stopColor = 'yellow';
                break;
            case '#c64028':
                stopColor = 'red';
                break;
            case '#0c8b48':
                stopColor = 'green';
                break;
            case '#233f92':
                stopColor = 'blue';
                break;
            default:
                stopColor = ' ';
        }
        return (
            <div className={this.props.className}>
                <AutoAffix viewportOffsetTop={53} container={this}
                           onAffixed={()=>this.setState({toggleClass: !this.state.toggleClass})}
                           onAffixedTop={()=>this.setState({toggleClass: false})}
                >
                    <div className={`stop wrapper ${stopColor}`} onClick={this.props.handleCurrentStop(index)}>
                        <div className="inner">
                            <img
                                src={_.isEmpty(_.get(stop, 'icon.url', '')) ? '/assets/images/MapIcons/icn_boat_pad.svg' : _.get(stop, 'icon.url', '')}
                                alt="" className="icon"/>
                            <h2 className="secondary-headliner">
                                Stop {_.get(stop, 'title', 'StopName')}
                            </h2>
                            <h3 className="third-headliner">{_.get(stop, 'locationName', 'StopName')}</h3>
                        </div>
                    </div>
                </AutoAffix>
                <div className={this.state.toggleClass ? 'top' : ''}>{filteredPlaces.map((place)=>
                    <Place
                        key={place.id} place={place} onClick={this._handleShowPlace.bind(this, place)} showAll={false}/>)}</div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    currentFilters: state.interactiveMap.currentFilters,
    favouritePlaces: state.favouritePlaces
});


export default connect(mapStateToProps, null)(Stop)
