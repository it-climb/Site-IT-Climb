'use strict';
import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import favouritePlacesUtils from '../../../utils/favourite_places_utils';
import TripAdvisor from '../../common/trip-advisor/trip-advisor';
import LinkToMap from '../../common/link-to-map/link-to-map';
import {addFavouritePlace} from '../../../actions/favourite-places-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Button from '../../common/button/customButton';

class Place extends Component {

    static propTypes = {
        place: PropTypes.object,
        onClick: PropTypes.func
    };

    static choosePlace(place, ev) {
        ev.preventDefault();
        this.props.addFavouritePlace(place.id);
        this.forceUpdate();
    }

    render() {

        let  {place} = this.props,
            {favouritePlaces} = this.props,
            thumbnail = _.get(place, 'thumbnail.url') || '/assets/images/place/photo-not-available.png';

        return (
            <div className="place">
                <div className="place-logo"
                     style={{
                         background: `url(${thumbnail}) no-repeat center center`,
                         backgroundSize: 'cover'
                     }}/>
                <div className="place-trip-advisor" onClick={this.props.onClick}>
                    {
                        !_.isNull(_.get(place, 'tripAdvisorId', null)) && <TripAdvisor data={place.tripAdviserData}/>
                    }
                    <h4 className="fourth-headliner">
                        {_.get(place, 'title', 'Place Name')}
                    </h4>
                    <p className="regular-text clips">
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
                    </div>}
                    {place.nearbyAttraction &&
                    <div className="attraction">
                        <img src="/assets/images/cruise/icn_cocount_no_animate.svg" alt="box" className="cocount"/>
                        <h5 className="fifth-headliner">
                            Nearby Attraction
                        </h5>
                    </div>}
                </div>
                <div className="place-activity">
                    <Button className="btn btn-main btn-activity" firstColor="#F9F9F9" secondColor='#EFEFEF' corner={156}
                            onClick={Place.choosePlace.bind(this, place)}>
                        <img
                            src={`/assets/images/cruise/${favouritePlaces.set.has(place.id) ? 'star-favourite.svg' : 'star.svg'}`}
                            alt="star" className="star"/> Save
                    </Button>

                    <LinkToMap location={place.location}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    favouritePlaces: state.favouritePlaces,
});

const mapDispatchToProps = dispatch => bindActionCreators({addFavouritePlace}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Place)
