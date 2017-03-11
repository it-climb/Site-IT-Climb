'use strict';
import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import PlaceM from './place-mobile';
import {connect} from 'react-redux';
import favouritePlacesUtils from '../../../utils/favourite_places_utils';
import Slider from 'react-slick';
import {MY_FAVOURITES} from '../../../constants/index';

class StopM extends Component {

    static propTypes = {
        stop: PropTypes.object,
        handleShowPlace: PropTypes.function,
        color: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            favoritePlaces: [],
        };
    }

    _handleShowPlace(place) {
        this.props.handleShowPlace(place);
    }


    render() {

        let stopColor,
            favouritePlaces = Array.from(this.props.favouritePlaces.set),
            {stop, color, currentFilters} = this.props,
            filteredPlaces = _.isEmpty(currentFilters) ? stop.places : stop.places
                .filter((place)=> {
                    return !_.isEmpty((_.intersection(currentFilters, place.type))) || (_.includes(currentFilters, MY_FAVOURITES) && (!_.isEmpty(_.intersection(favouritePlaces, [place.id]))))
                }),
            places = filteredPlaces.map((place)=><PlaceM key={place.id} place={place}
                                                        onClick={this._handleShowPlace.bind(this, place)}/>),
            numbersOfSlides = places.length < 4 ? places.length : 4;
        color = _.trim(color);

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


        let sliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            arrows: false,
            className: 'container',
            slidesToShow: numbersOfSlides,
            slidesToScroll: numbersOfSlides,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }]
        };
        return (
            <div className="stop-container">
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
                <Slider {...sliderSettings}>
                    {places.length > 0 ?
                        places.map((place)=>
                            <div
                                key={place.id}
                                className="single-place">
                                {place}
                            </div>)
                        :
                        <div></div>
                    }
                </Slider>

            </div>

        )
    }
}

const mapStateToProps = state => ({
    currentFilters: state.interactiveMap.currentFilters,
    favouritePlaces: state.favouritePlaces
});


export default connect(mapStateToProps)(StopM)