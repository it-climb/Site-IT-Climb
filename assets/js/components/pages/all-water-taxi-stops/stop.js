'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import Place from './place';
import AutoAffix from 'react-overlays/lib/AutoAffix';

export default class Stop extends Component {

    static propTypes = {
        stop: PropTypes.object,
        color: PropTypes.string,
        handleShowPlace: PropTypes.func
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
            {stop, color} = this.props;
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
            <div className='stop-container'>
                <AutoAffix viewportOffsetTop={52} container={this}
                           onAffixed={()=>this.setState({toggleClass: !this.state.toggleClass})}
                           onAffixedTop={()=>this.setState({toggleClass: false})}>
                    <div className={`stop wrapper ${stopColor}`}>
                        <div className="inner">
                            <div className="container">
                                <img
                                    src={_.isEmpty(_.get(stop, 'icon.url', '')) ? '/assets/images/MapIcons/icn_boat_pad.svg' : _.get(stop, 'icon.url', '')}
                                    alt="" className="icon"/>
                                <h2 className="secondary-headliner">
                                    Stop {_.get(stop, 'title', 'StopName')}
                                </h2>
                                <h3 className="third-headliner">{_.get(stop, 'locationName', 'StopName')}</h3>
                            </div>
                        </div>
                    </div>
                </AutoAffix>
                <div className={this.state.toggleClass ? 'container top' : 'container'}>{stop.places.map((place)=>
                    <Place
                        key={place.id} place={place} onClick={this._handleShowPlace.bind(this, place)}/>)}</div>
            </div>

        )
    }
}
