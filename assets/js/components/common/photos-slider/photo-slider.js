import _ from 'lodash';
import React, {PropTypes, Component} from 'react';
import Slider from 'react-slick';
import {Alert} from 'react-bootstrap';

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    className: 'photos',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
};

export default class PhotoSlider extends Component {

    static propTypes = {
        place: PropTypes.object.isRequired
    };

    render() {

        let photos = _.get(this.props.place, 'photos', []),
            photosElement = photos.length == 0
                ? <Alert bsStyle="info" className="text-center wrapper"><div className="inner"><strong>No photos</strong></div></Alert>
                : <Slider {...sliderSettings}>
                    {photos.map((photo, index)=>(
                        <div className="slide" key={index}>
                            <div className="photo-wrapper">
                                <img src={photo.url} alt=""/>
                            </div>

                        </div>)
                    )}
                </Slider>;

        return (
            <div className="photo-place">
                {photosElement}
                <div className="photos-number">
                    {photos.length}&nbsp;Photos
                </div>
            </div>
        )

    }
}