'use strict';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import TripAdvisor from '../../common/trip-advisor/trip-advisor';

class Place extends Component {

    static propTypes = {
        place: PropTypes.object,
        onClick: PropTypes.func
    };

    render() {

        let  {place} = this.props;
        return (
            <div className="place">
                <div className="place-activity">
                    <img src={_.get(place, 'icon.url', '/assets/images/icn_map.svg')} alt="star" className="map"/>
                </div>
                <div className="place-trip-advisor" onClick={this.props.onClick}>
                    {
                        !_.isNull(_.get(place, 'tripAdvisorId', null)) && <TripAdvisor data={place.tripAdviserData}/>
                    }
                    <h4 className="fourth-headliner">
                        {_.get(place, 'title', 'Place Name')}
                    </h4>
                    <p className="regular-text">
                        {_.get(place, 'description', 'Place info')}
                    </p>
                    {!_.isEmpty(_.get(place, 'discount', '')) && <div className="wealth">
                        <img src="/assets/images/cruise/box_no_animate.svg" alt="box" className="box"/>
                        <h5 className="fifth-headliner">
                            Cruise & Save
                        </h5>
                        <h6 className="discount">
                            {_.get(place, 'discount', 'no discount')}
                        </h6>
                    </div>
                    }
                    {place.nearbyAttraction &&
                    <div className="attraction">
                        <img src="/assets/images/cruise/icn_cocount_no_animate.svg" alt="box" className="cocount"/>
                        <h5 className="fifth-headliner">
                            Nearby Attraction
                        </h5>
                    </div>}
                </div>
            </div>
        )
    }
}

export default Place;

