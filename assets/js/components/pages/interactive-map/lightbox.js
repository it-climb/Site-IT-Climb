import React, {PropTypes} from 'react';
import _ from "lodash";
import Place from './place';
import Address from '../../common/address/address';
import OpenHours from '../../common/open-hours/open-hours';
import PhotoSlider from '../../common/photos-slider/photo-slider';
import Button from '../../common/button/customButton';

const Lightbox = ({onClick, place}) => {

    return (
        <div className='lightbox'>
            <Button className="btn btn-main btn-close-lightbox" firstColor="#F9F9F9" secondColor='#EFEFEF' corner={156}
                    onClick={onClick}>
                <i className="fa fa-arrow-left"/>
                Back
            </Button>
            <PhotoSlider place={place}/>
            <Place place={place} showAll={true}/>
            <Address place={place}/>
            <OpenHours place={place}/>
        </div>

    )
};


Lightbox.propTypes = {
    onClick: PropTypes.func.isRequired,
    place: PropTypes.object.isRequired,
};

export default Lightbox



