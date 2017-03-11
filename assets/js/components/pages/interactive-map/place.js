'use strict';
import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import TripAdvisor from '../../common/trip-advisor/trip-advisor';
import {addFavouritePlace} from '../../../actions/favourite-places-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Place extends Component {

    static propTypes = {
        place: PropTypes.object,
        onClick: PropTypes.func,
        showAll : PropTypes.bool
    };

    static choosePlace(place, ev) {
        ev.preventDefault();
        this.props.addFavouritePlace(place.id);
        this.forceUpdate();
    }


    render() {

        let {place, favouritePlaces, showAll} = this.props,
            {icon} = place,
            placeImage = icon ? (<img src={icon.url} alt="star" className="map"/>) : (<img src="/assets/images/icn_map.svg" alt="star" className="map"/>);

        return (
            <div className="place">
                <div className="place-activity">
                    {placeImage}
                </div>
                <div className="place-trip-advisor">
                    <h4 className="fourth-headliner" onClick={this.props.onClick} onTouchStart={this.props.onClick}>
                        {_.get(place, 'title', 'Place Name')}
                    </h4>
                    {!_.isEmpty(_.get(place, 'discount', '')) && <div className="wealth">
                        <img src="/assets/images/cruise/box.svg" alt="box" className="box"/>
                        <h5 className="fifth-headliner">
                            Cruise & Save
                        </h5>
                        <h6 className="discount">
                            {_.get(place, 'discount', 'no discount')}
                        </h6>
                    </div>}

                    {!_.isEmpty(_.get(place, 'attraction', '')) && <div className="attraction">
                        <img src="/assets/images/cruise/icn_cocount.svg" alt="box" className="cocount"/>
                        <h5 className="fifth-headliner">
                            {_.get(place, 'attraction', 'no attraction')}
                        </h5>
                    </div>}
                    <TripAdvisor data={place.tripAdviserData}/>
                    {showAll && <p className="regular-text clips">
                        {_.get(place, 'description', 'Place info')}
                    </p>}
                </div>
                <div className="my-favorite">
                    <img
                        src={`/assets/images/cruise/${favouritePlaces.set.has(place.id) ? 'star-favourite.svg' : 'star.svg'}`}
                        alt="star" className="star" onClick={Place.choosePlace.bind(this, place)}/>
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


