'use strict';

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Place from './place';

class Stop extends Component {

    static propTypes = {
        stop: PropTypes.object,
        handleShowPlace: PropTypes.func
    };

    constructor(props){
        super(props);

        this.state = {
            favoritePlaces : []
        }
    }
    _handleShowPlace(place) {
        this.props.handleShowPlace(place);
    }

    render() {

        let stop = _.get(this.props, 'stop', []);

        return (
            <div className="stop-container">
                <div className="stop">
                    <img src={_.isEmpty(_.get(stop, 'icon.url', ''))?'/assets/images/MapIcons/icn_boat_pad.svg': _.get(stop, 'icon.url', '')} alt=""
                         className="icon"/>
                    <span className="stop-marker">{_.get(stop, 'title', 'StopName')}</span>
                    <h3 className="fourth-headliner">Stop&nbsp;{_.get(stop, 'title', 'StopName') + ' ' +_.get(stop, 'locationName', 'StopName')}</h3>
                    <p className="regular-text">
                        {_.get(stop, 'fullDescription', 'Some Description')}
                    </p>
                    {!_.isEmpty(_.get(stop, 'shortDescription'))&&<div className="short-description">&#698;{_.get(stop, 'shortDescription')} &#698;</div>}
                </div>
                {stop.places.map((place)=> <Place key={place.id} place={place} onClick={this._handleShowPlace.bind(this, place)}/>)}
            </div>

        )
    }
}

export default Stop;